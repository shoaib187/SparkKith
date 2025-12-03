
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
  BackHandler,
  RefreshControl,
  ToastAndroid,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";

import StatsSection from "../../../components/stats/statsSection";
import StreakProgress from "../../../components/common/streakProgress/streakProgress";
import IconButton from "../../../components/common/iconbutton/iconButton";
import TaskCard from "../../../components/common/taskCard/taskCard";
import QuotesSection from "../../../components/common/qoutesSection/qoutesSection";
import MoodSection from "../../../components/common/moodSection/moodSection";
import BottomSheet from "../../../components/common/bottomSheet/bottomSheet";
import TaskCompletedMessage from "../../../components/common/taskCompletedMessage/taskCompletedMessage";
import NoTaskAssigned from "../../../components/common/noTaskAssigned/noTaskAssigned";
import { getTodayTasks, getTriggeredTasks, markAsDoneTask, skipTask, undoTask } from "../../../redux/slices/taskSlice/taskSlice";

import colors from "../../../components/constants/colors/colors";
import { FONT_SIZES } from "../../../components/constants/sizes/responsiveFont";
import HomeSkeleton from "../../../components/skeletons/homeSkeleton/homeSkeleton";
import { fetchUserProfile } from "../../../redux/slices/profileSlice/profileSlice";
import SkipSheet from "../skipSheet/skipSheet";
import ConfirmCompleteTask from "../confirmCompleteTask/confirmCompleteTask";
import CompleteTaskSheet from "../completeTaskSheet/completeTaskSheet";

export default function Home({ navigation }) {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const { triggeredTasks } = useSelector((state) => state.tasks);
  const { token } = useSelector((state) => state.auth);
  const { profileData } = useSelector((state) => state.profile);
  // console.log("profileData", token)
  // console.log("today tasks", tasks)
  // console.log("triggeredTasks", triggeredTasks)

  const [visible, setVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedMood, setSelectedMood] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [skipVisible, setSkipVisible] = useState(false)
  const [undoTaskVisible, setUndoTaskVisible] = useState(false)

  const fallbackImage = require("../../../../assets/png/twinkle.png");

  const backendBadges = profileData?.badges || [];
  const unlockedBadges = backendBadges.filter(b => b.unlocked === true).length;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Good morning";
    if (hour >= 12 && hour < 17) return "Good afternoon";
    if (hour >= 17 && hour < 21) return "Good evening";
    return "Good night";
  };


  /** -------------------------------
   * FETCH DATA WHEN SCREEN FOCUSES
   --------------------------------*/


  useEffect(() => {
    const fetchData = async () => {
      setInitialLoad(true)
      try {
        if (token) {
          dispatch(getTodayTasks(token));
          dispatch(fetchUserProfile(token));
          dispatch(getTriggeredTasks(token));
          // dispatch(triggerTasks(token))
        }
      } catch (error) {
        console.log("err", error)
      } finally {
        setInitialLoad(false)
      }
    }
    fetchData()
  }, [dispatch, token, isFocused]);

  /** -------------------------------
   * HANDLE ANDROID BACK PRESS
   --------------------------------*/
  useEffect(() => {
    const backAction = () => {
      if (!isFocused) return false;

      Alert.alert("SparkKith!", "Are you sure you want to exit the app?", [
        { text: "Cancel", style: "cancel" },
        { text: "YES", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => backHandler.remove();
  }, [isFocused]);

  /** -------------------------------
   * TASK ACTIONS
   --------------------------------*/
  const handleDone = async () => {
    if (!selectedTask) return;

    setLoading(true);
    try {
      const result = await dispatch(markAsDoneTask({ taskId: selectedTask._id, token }));
      console.log("handleDone result:", result);

      // Check if the action was fulfilled
      if (result.meta?.requestStatus === 'fulfilled') {
        ToastAndroid.show("Task marked as done!", ToastAndroid.SHORT);

        // Close all sheet states
        setVisible(false);
        setSkipVisible(false);
        setUndoTaskVisible(false);

        // Refresh data
        await Promise.all([
          dispatch(getTriggeredTasks(token)),
          dispatch(fetchUserProfile(token))
        ]);

        // Navigate after refreshing
        navigation.navigate("TaskCompleted", { selectedTask });
      } else {
        ToastAndroid.show("Failed to mark task as done!", ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error("Error in handleDone:", error);
      ToastAndroid.show("Something went wrong!", ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };

  const handleUndo = async () => {
    if (!selectedTask) return;

    setLoading(true);
    try {
      const result = await dispatch(undoTask({ taskId: selectedTask._id, token }));
      console.log("handleUndo result:", result);

      // Check if the action was fulfilled
      if (result.meta?.requestStatus === 'fulfilled') {
        ToastAndroid.show("Task reverted!", ToastAndroid.SHORT);

        // Close all sheet states
        setVisible(false);
        setSkipVisible(false);
        setUndoTaskVisible(false);

        // Refresh data
        await Promise.all([
          dispatch(getTriggeredTasks(token)),
          dispatch(fetchUserProfile(token))
        ]);
      } else {
        ToastAndroid.show("Failed to revert task!", ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error("Error in handleUndo:", error);
      ToastAndroid.show("Something went wrong!", ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = async () => {
    if (!selectedTask) return;

    setLoading(true);
    try {
      const result = await dispatch(skipTask({ taskId: selectedTask._id, token }));
      console.log("handleSkip result:", result);

      // Check if the action was fulfilled
      if (result.meta?.requestStatus === 'fulfilled') {
        ToastAndroid.show("Task Skipped!", ToastAndroid.SHORT);

        // Close all sheet states
        setVisible(false);
        setSkipVisible(false);
        setUndoTaskVisible(false);

        // Refresh data
        await Promise.all([
          dispatch(getTriggeredTasks(token)),
          dispatch(fetchUserProfile(token))
        ]);
      } else {
        ToastAndroid.show("Failed to skip task!", ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error("Error in handleSkip:", error);
      ToastAndroid.show("Something went wrong!", ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };


  /** -------------------------------
   * PULL TO REFRESH
   --------------------------------*/
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      if (token) {
        await dispatch(getTodayTasks(token));
        await dispatch(getTriggeredTasks(token));
        await dispatch(fetchUserProfile(token));
      }
    } catch (err) {
      console.log("Refresh error:", err);
    } finally {
      setRefreshing(false);
    }
  };


  // const todayStr = new Date().toDateString();

  // // Filter today's tasks and exclude skipped tasks
  // const todaysTasks = triggeredTasks?.filter(t => {
  //   const taskDateStr = new Date(t.date).toDateString();
  //   return taskDateStr === todayStr && !t.skipped; // exclude skipped tasks
  // }) || [];

  // // Sort tasks by time
  // const sortedTasks = todaysTasks.sort(
  //   (a, b) => new Date(a.date) - new Date(b.date)
  // );
  const todayStr = new Date().toDateString();

  // Step 1 & 2 → get today's tasks without skipped
  const todaysTasks = triggeredTasks?.filter(t => {
    const taskDateStr = new Date(t.date).toDateString();
    return taskDateStr === todayStr && !t.skipped;
  }) || [];

  // Step 3 → sort by date/time
  const sortedTasks = todaysTasks.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  // Step 4 → get incomplete tasks
  const notCompleted = sortedTasks.filter(task => !task.completed);

  // Step 5 & 6 → final output
  const finalTasksToShow = notCompleted.length > 0
    ? [notCompleted[0]]        // show only first incomplete
    : sortedTasks;             // else show all completed tasks


  // console.log("Sorted pending tasks:", sortedTasks);

  const streakValue = Number(profileData?.streak?.value || 0);
  const streakPercentage = (streakValue / 14) * 100;

  if (initialLoad) {
    return <HomeSkeleton />
  }

  return (
    <SafeAreaView style={styles.safe}>
      {/* -----------------------header------------------------ */}
      <View style={styles.headerRow}>
        <View style={styles.imageWrapper}>
          <Image
            source={
              profileData?.profilePicture
                ? { uri: profileData.profilePicture }
                : fallbackImage
            }
            style={styles.avatar}
          />
        </View>

        <View style={styles.greeting}>
          <Text style={styles.greetingSmall}>
            {getGreeting()}, {profileData?.username || "User"}!
          </Text>

          <Text style={styles.greetingLarge}>Ready for your Spark journey?</Text>
        </View>
      </View>

      {/* -----------------------main content------------------------ */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={styles.container}
      >
        <StatsSection stats={profileData} unlockedBadges={unlockedBadges} />
        <StreakProgress streakValue={streakValue} progress={streakPercentage} title="Streak Saver Badge" />

        {/* Today's Task Header */}
        <View style={styles.header}>
          <Text style={styles.taskText}>Today's Task</Text>
          <IconButton
            onPress={() => navigation.navigate("AddTask")}
            iconSrc={require("../../../../assets/png/add.png")}
          />
        </View>

        {/* Tasks */}
        {finalTasksToShow.length > 0 ? (
          finalTasksToShow.map((task, index) => {
            // If skipped → show skipped message
            if (task.skipped) {
              return (
                <TaskCompletedMessage
                  key={index}
                  isSkipped={true}
                  message="You skipped this task"
                  undoTask={() => {
                    setSelectedTask(task);
                    setVisible(true);
                  }}
                />
              );
            }

            // 2 If completed → show completed UI
            if (task.completed) {
              return (
                <TaskCompletedMessage
                  key={index}
                  message="You completed your daily task!"
                  onPress={() => navigation.navigate("DailyStreak", { item: task, profileData })}
                  undoTask={() => {
                    setSelectedTask(task);
                    setUndoTaskVisible(true)
                  }}
                />
              );
            }

            // 3️ Pending task → show TaskCard
            return (
              <TaskCard
                key={index}
                task={task}
                navigation={navigation}
                onPress={() => navigation.navigate("DailyStreak", { item: task, profileData })}
                onSkip={() => {
                  setSelectedTask(task);
                  setSkipVisible(true)
                }}
                onDone={() => {
                  setSelectedTask(task);
                  setVisible(true);
                }}
              // loading={loading}
              />
            );
          })
        ) : (
          <NoTaskAssigned navigation={navigation} />
        )}
        <QuotesSection />
        <MoodSection navigation={navigation} selectedMood={selectedMood} setSelectedMood={setSelectedMood} />
      </ScrollView>

      {/* Bottom Sheet */}
      <BottomSheet
        visible={visible || skipVisible || undoTaskVisible}
        onClose={() => {
          setVisible(false);
          setSkipVisible(false);
          setUndoTaskVisible(false);
        }}
      >
        {skipVisible ? (
          <SkipSheet
            selectedTask={selectedTask}
            setSkipVisible={setSkipVisible}
            handleSkip={handleSkip}
            loading={loading}
          />
        ) : undoTaskVisible ? (
          <CompleteTaskSheet
            selectedTask={selectedTask}
            onUndo={handleUndo}
            loading={loading}
          />
        ) : (
          <ConfirmCompleteTask
            selectedTask={selectedTask}
            onDone={handleDone}
            loading={loading}
          />
        )}
      </BottomSheet>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.bgColor,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },

  imageWrapper: {
    width: 50,
    height: 50,
    borderRadius: 60,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
    resizeMode: "contain",
  },

  greeting: { flex: 1, paddingLeft: 12 },
  greetingSmall: { fontSize: FONT_SIZES.md, fontWeight: "700", marginTop: 4 },
  greetingLarge: { fontSize: FONT_SIZES.sm, color: colors.description },

  container: {
    paddingHorizontal: 16,
    paddingBottom: 16
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 12,
  },

  taskText: { fontSize: FONT_SIZES.md, fontWeight: "900" },
});
