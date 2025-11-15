import React, { useEffect, useState } from 'react';
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
  ToastAndroid
} from 'react-native';
import StatsSection from '../../../components/stats/statsSection';
import StreakProgress from '../../../components/common/streakProgress/streakProgress';
import IconButton from '../../../components/common/iconbutton/iconButton';
import TaskCard from '../../../components/common/taskCard/taskCard';
import QuotesSection from '../../../components/common/qoutesSection/qoutesSection';
import MoodSection from '../../../components/common/moodSection/moodSection';

import { FONT_SIZES } from '../../../components/constants/sizes/responsiveFont';
import colors from '../../../components/constants/colors/colors';
import BottomSheet from '../../../components/common/bottomSheet/bottomSheet';
import CompleteTask from '../../../components/common/completeTask/completeTask';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getTodayTasks, markAsDoneTask, undoTask } from '../../../redux/slices/taskSlice/taskSlice';
import { fetchUserProfile } from '../../../redux/slices/authSlice/authSlice';
import TaskCompletedMessage from '../../../components/common/taskCompletedMessage/taskCompletedMessage';
import NoTaskAssigned from '../../../components/common/noTaskAssigned/noTaskAssigned';

export default function Home({ navigation }) {
  const dispatch = useDispatch();
  const { tasks } = useSelector(state => state.tasks);
  const { token, user } = useSelector(state => state.auth);
  // console.log("token", token)
  // console.log("user", user)
  console.log("tasks", tasks)

  const [visible, setVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false);

  const heroImage = require('../../../../assets/png/twinkle.png');

  // console.log("selectedTask", selectedTask)
  const isFocused = useIsFocused();

  // Fetch tasks
  useEffect(() => {
    if (token) {
      dispatch(getTodayTasks(token));
      dispatch(fetchUserProfile(token))
    }
  }, [dispatch, token]);

  // Back handler
  useEffect(() => {
    const backAction = () => {
      if (isFocused) {
        Alert.alert('SparkKith!', 'Are you sure you want to exit the app?', [
          { text: 'Cancel', style: 'cancel' },
          { text: 'YES', onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      }
      return false;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [isFocused]);




  const handleDone = async () => {
    setLoading(true);
    try {
      const res = await dispatch(
        markAsDoneTask({ taskId: selectedTask?._id, done: true, token })
      );

      ToastAndroid.show("Task marked as done!", ToastAndroid.SHORT);

      await dispatch(getTodayTasks(token));
      setVisible(false);
      navigation.navigate("TaskCompleted", { selectedTask });
    } catch (error) {
      ToastAndroid.show("Something went wrong!", ToastAndroid.SHORT);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleUndo = async () => {
    setLoading(true);
    try {
      const res = await dispatch(
        undoTask({ taskId: selectedTask?._id, token })
      );

      ToastAndroid.show("Task reverted!", ToastAndroid.SHORT);

      await dispatch(getTodayTasks(token));
      setVisible(false);
    } catch (error) {
      ToastAndroid.show("Something went wrong!", ToastAndroid.SHORT);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);

    try {
      if (token) {
        await dispatch(getTodayTasks(token));
        await dispatch(fetchUserProfile(token));
      }
    } catch (error) {
      console.log("Refresh error:", error);
    } finally {
      setRefreshing(false);
    }
  };

  // Filter task for today
  const today = new Date().toISOString().split('T')[0]; // yyyy-mm-dd
  const todaysTask = tasks.find(task => task.time.split('T')[0] === today);
  console.log("todaysTask", tasks)

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.headerRow}>
        <View style={styles.imageWrapper}>
          <Image source={heroImage} style={styles.avatar} />
        </View>
        <View style={styles.greeting}>
          <Text style={styles.greetingSmall}>Good morning, Alex!</Text>
          <Text style={styles.greetingLarge}>Ready for your Spark journey?</Text>
        </View>
      </View>

      <ScrollView refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      } showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
        <StatsSection />
        <StreakProgress />

        {/* Today's Task */}
        <View style={styles.header}>
          <Text style={styles.taskText}>Today's Task</Text>
          <IconButton
            onPress={() => navigation.navigate("AddTask")}
            iconSrc={require("../../../../assets/png/add.png")}
          />
        </View>

        {/* {todaysTask ? (
          <TaskCard
            onPress={() => navigation.navigate("DailyStreak", { item: todaysTask })}
            navigation={navigation}
            task={todaysTask}
            onSkip={() => {
              setSelectedTask(todaysTask)
              setVisible(true)
            }}
            onDone={() => {
              // navigation.navigate("DailyStreak", { item: todaysTask })
              setSelectedTask(todaysTask)
              setVisible(true)
            }}
          />
        ) : (
          <View style={styles.noTaskContainer}>
            <View style={styles.noTaskIcon}>
              <Text style={styles.noTaskEmoji}>📝</Text>
            </View>
            <Text style={styles.noTaskTitle}>No tasks for today</Text>
            <Text style={styles.noTaskSubtitle}>
              Enjoy your free time or create a new task to stay productive!
            </Text>
            <Button
              title='Create a Task'
              style={styles.createTaskButton}
              onPress={() => navigation.navigate("AddTask")}
            />
          </View>
        )} */}


        {todaysTask ? (
          todaysTask?.done ? (
            <TaskCompletedMessage undoTask={() => {
              setSelectedTask(todaysTask)
              setVisible(true)
            }} />
          ) : (
            <TaskCard
              onPress={() => navigation.navigate("DailyStreak", { item: todaysTask })}
              navigation={navigation}
              task={todaysTask}
              onSkip={() => {
                setSelectedTask(todaysTask)
                setVisible(true)
              }}
              onDone={() => {
                setSelectedTask(todaysTask)
                setVisible(true)
              }}
              loading={loading}
            />
          )
        ) : (
          <NoTaskAssigned navigation={navigation} />
        )}


        <QuotesSection />
        <MoodSection navigation={navigation} />
      </ScrollView>

      <BottomSheet visible={visible} onClose={() => setVisible(false)}>
        <CompleteTask onUndo={() => handleUndo(selectedTask)} selectedTask={selectedTask} onDone={() => handleDone(selectedTask)} />
      </BottomSheet>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bgColor },
  imageWrapper: {
    width: 50, height: 50, borderRadius: 60,
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: colors.white,
  },
  container: { paddingHorizontal: 16, paddingBottom: 16 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 10 },
  greeting: { flex: 1, paddingLeft: 12 },
  greetingSmall: { fontSize: FONT_SIZES.md, fontWeight: '700', marginTop: 4 },
  greetingLarge: { color: colors.description, fontSize: FONT_SIZES.sm },
  avatar: { width: 40, height: 40, resizeMode: 'contain' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 12 },
  taskText: { fontSize: FONT_SIZES.md, fontWeight: '900' },
});
