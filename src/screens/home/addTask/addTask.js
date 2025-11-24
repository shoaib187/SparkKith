import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
} from "react-native";
import Header from "../../../components/common/header/header";
import colors from "../../../components/constants/colors/colors";
import { FONT_SIZES } from "../../../components/constants/sizes/responsiveFont";
import SuggestionCard from "../../../components/common/suggestionCard/suggestionCard";
import BottomSheet from "../../../components/common/bottomSheet/bottomSheet";
import DateTimePicker from "../../../components/common/dateTimePicker/dateTimePicker";
import { useDispatch, useSelector } from "react-redux";
import { createTask, getTodayTasks } from "../../../redux/slices/taskSlice/taskSlice";
import Button from "../../../components/common/button/button";
import notifee, { AndroidImportance, TriggerType } from '@notifee/react-native';
import { taskSuggestion } from "../../../utils/services/services";

export default function AddTask({ navigation }) {
  const dispatch = useDispatch();
  const { token } = useSelector(state => state.auth)
  const { loading } = useSelector(state => state?.tasks)

  const [visible, setVisible] = useState(false)
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [searchText, setSearchText] = useState("");

  // On mount, pick 5 random suggestions
  useEffect(() => {
    const shuffled = taskSuggestion.sort(() => 0.5 - Math.random());
    setFilteredSuggestions(shuffled.slice(0, 5));
  }, []);


  // Filter suggestions when user types
  useEffect(() => {
    if (searchText.trim() === "") {
      // Show 5 random if search is empty
      const shuffled = taskSuggestion.sort(() => 0.5 - Math.random());
      setFilteredSuggestions(shuffled.slice(0, 5));
    } else {
      const filtered = taskSuggestion.filter(
        (item) =>
          item.title.toLowerCase().includes(searchText.toLowerCase()) ||
          item.description.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    }
  }, [searchText]);


  const [taskDateTime, setTaskDateTime] = useState({
    date: null,
    time: null,
    notificationTime: null,
    reminder: false,
    selectedTimeFrame: "Anytime",
    timeLabel: "12:00 PM",
  });

  const handleDateTimeChange = (data) => {
    setTaskDateTime(data);
  };



  // Function to schedule notification at the selected time
  const scheduleNotification = async (taskData) => {
    try {
      console.log('Scheduling notification for:', taskData.notificationTime);

      // Request permission first
      const settings = await notifee.requestPermission();

      if (settings.authorizationStatus < 1) {
        console.warn('Notification permission not granted');
        return;
      }

      // Create notification channel
      const channelId = await notifee.createChannel({
        id: 'task-reminders',
        name: 'Task Reminders',
        importance: AndroidImportance.HIGH,
        sound: 'default',
      });

      // Schedule notification using trigger
      await notifee.createTriggerNotification(
        {
          id: `task-${Date.now()}`,
          title: '🔔 Task Reminder',
          body: `${taskData.title}${taskData.description ? ` - ${taskData.description}` : ''}`,
          android: {
            channelId,
            smallIcon: 'ic_launcher',
            pressAction: {
              id: 'default',
            },
            sound: 'default',
          },
          data: {
            taskId: `task-${Date.now()}`,
            type: 'task-reminder'
          },
        },
        {
          type: TriggerType.TIMESTAMP,
          timestamp: taskData.notificationTime.getTime(),
        }
      );

      console.log('✅ Notification scheduled successfully for:', taskData.notificationTime.toString());
      return true;

    } catch (error) {
      console.error('❌ Failed to schedule notification:', error);

      // Fallback: Try alternative method for newer Notifee versions
      try {
        await notifee.displayNotification({
          id: `task-${Date.now()}`,
          title: '🔔 Task Reminder',
          body: `${taskData.title}${taskData.description ? ` - ${taskData.description}` : ''}`,
          android: {
            channelId: 'task-reminders',
            smallIcon: 'ic_launcher',
            pressAction: { id: 'default' },
            sound: "default",
          },
        });
        console.log('✅ Fallback notification shown immediately');
        return true;
      } catch (fallbackError) {
        console.error('❌ Fallback notification also failed:', fallbackError);
        return false;
      }
    }
  };

  const handleCreateTask = async () => {
    if (!title) {
      ToastAndroid.show("Please enter a title", ToastAndroid.LONG);
      return;
    }

    if (!taskDateTime.date || !taskDateTime.time) {
      ToastAndroid.show("Please choose date & time", ToastAndroid.LONG);
      return;
    }

    // Use the notification time that was calculated in DateTimePicker
    const isoTime = taskDateTime.notificationTime.toISOString();

    // Debug logs
    // console.log('Final payload time:', isoTime);
    // console.log('Selected time frame:', taskDateTime.selectedTimeFrame);
    // console.log('Notification time:', taskDateTime.notificationTime.toString());
    // console.log('Reminder enabled:', taskDateTime.reminder);

    const payload = {
      title,
      description,
      time: isoTime,
      reminder: taskDateTime.reminder,
      timeFrame: taskDateTime.selectedTimeFrame,
    };
    dispatch(createTask({ taskData: payload, token }))
      .unwrap()
      .then(async (response) => {
        // Schedule notification if reminder is enabled
        if (taskDateTime.reminder) {
          const notificationScheduled = await scheduleNotification({
            ...payload,
            notificationTime: taskDateTime.notificationTime
          });

          if (notificationScheduled) {
            ToastAndroid.show("Task Created with Reminder! 🔔", ToastAndroid.LONG);
          } else {
            ToastAndroid.show("Task Created but notification failed", ToastAndroid.LONG);
          }
        } else {
          ToastAndroid.show("Task Created!", ToastAndroid.LONG);
        }
        await dispatch(getTodayTasks(token))
        navigation.goBack();
      })
      .catch((error) => {
        console.error('Task creation failed:', error);
        ToastAndroid.show("Failed to create task", ToastAndroid.LONG);
      });
  };

  // Get display text for selected time
  const getTimeDisplayText = () => {
    if (!taskDateTime.date || !taskDateTime.time) {
      return "Select date & time";
    }

    const dateStr = taskDateTime.date.toDateString();

    if (taskDateTime.reminder) {
      return `${dateStr} • ${taskDateTime.timeLabel} (${taskDateTime.selectedTimeFrame})`;
    }

    return `${dateStr} • ${taskDateTime.timeLabel}`;
  };





  return (
    <View style={styles.container}>
      <Header title={"Add Task"} navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Top Icon */}
        <View style={styles.addTaskWrapper}>
          <View style={styles.iconBg}>
            <Image
              source={require("../../../../assets/png/goal.png")}
              style={styles.iconImage}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.titleInput}
              placeholder="Task title..."
              placeholderTextColor="#9CA3AF"
              value={title}
              // onChangeText={setTitle}
              onChangeText={(text) => {
                setTitle(text);
                setSearchText(text);
              }}
            />
          </View>

          {/* Date & Time */}
          <TouchableOpacity onPress={() => setVisible(!visible)} style={styles.dateContainer}>
            <View style={styles.dateIconBg}>
              <Image
                source={require("../../../../assets/png/calendar.png")}
                style={styles.dateIcon}
              />
            </View>
            <View style={styles.dateTextContainer}>
              <Text style={styles.dateText}>
                {getTimeDisplayText()}
              </Text>
              {taskDateTime.reminder && (
                <Text style={styles.reminderIndicator}>Reminder Enabled</Text>
              )}
            </View>
          </TouchableOpacity>

          {/* Description */}
          <View style={styles.descriptionContainer}>
            <TextInput
              style={styles.descriptionInput}
              placeholder="Add task details..."
              placeholderTextColor="#9CA3AF"
              multiline
              numberOfLines={6}
              textAlignVertical="top"
              value={description}
              onChangeText={setDescription}
            />
          </View>
        </View>

        {/* Suggestions Section */}
        <Text style={styles.suggestionHeading}>Suggestions</Text>
        <FlatList
          data={filteredSuggestions}
          keyExtractor={(item) => item?.description}
          contentContainerStyle={{ paddingHorizontal: 14 }}
          renderItem={({ item }) => (
            <SuggestionCard
              onPress={() => {
                setTitle(item.title);
                setDescription(item.description);
              }}
              item={item}
              key={item?.description}
            />
          )}
          scrollEnabled={false}
          ListEmptyComponent={() => (
            <Text style={{ textAlign: "center", color: "#6B7280", marginTop: 20 }}>
              No suggestions found.
            </Text>
          )}
        />
      </ScrollView>

      <BottomSheet visible={visible} onClose={() => setVisible(!visible)}>
        <DateTimePicker onChange={handleDateTimeChange} />
      </BottomSheet>

      <View style={styles.bottomButton}>
        <Button
          title={!loading ? "Add Task" : "Adding..."}
          onPress={handleCreateTask}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor
  },
  addTaskWrapper: {
    backgroundColor: colors.white,
    marginHorizontal: 14,
    borderRadius: 14,
    padding: 14
  },
  iconBg: {
    width: 50,
    height: 50,
    backgroundColor: "#E6D7C420",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  iconImage: {
    width: 36,
    height: 36,
    resizeMode: "contain",
  },
  titleInput: {
    fontSize: 16,
    paddingVertical: 8,
    color: "#111827",
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateIconBg: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: "#E6D7C420",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  dateIcon: {
    width: 22,
    height: 22,
    resizeMode: "contain",
  },
  dateTextContainer: {
    flex: 1,
  },
  dateText: {
    fontSize: 15,
    color: "#5B829A",
    fontWeight: "500",
  },
  reminderIndicator: {
    fontSize: 12,
    color: '#60A5FA',
    fontWeight: '600',
    marginTop: 2,
  },
  descriptionContainer: {
    backgroundColor: "#FDFCFC",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginTop: 14
  },
  descriptionInput: {
    fontSize: 15,
    color: "#111827",
    height: 90,
    paddingLeft: 12
  },
  suggestionHeading: {
    fontSize: FONT_SIZES.lg,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 10,
    marginLeft: 14,
    marginTop: 14
  },
  bottomButton: {
    padding: 14
  }
});
