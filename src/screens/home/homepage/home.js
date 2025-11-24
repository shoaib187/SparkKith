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
import CompleteTask from "../../../components/common/completeTask/completeTask";
import TaskCompletedMessage from "../../../components/common/taskCompletedMessage/taskCompletedMessage";
import NoTaskAssigned from "../../../components/common/noTaskAssigned/noTaskAssigned";
import { getTodayTasks, getTriggeredTasks, markAsDoneTask, triggerTasks, undoTask } from "../../../redux/slices/taskSlice/taskSlice";

import colors from "../../../components/constants/colors/colors";
import { FONT_SIZES } from "../../../components/constants/sizes/responsiveFont";
import HomeSkeleton from "../../../components/skeletons/homeSkeleton/homeSkeleton";
import { fetchUserProfile } from "../../../redux/slices/profileSlice/profileSlice";
import { getAchievementsCount } from "../../../utils/services/services";

export default function Home({ navigation }) {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const { triggeredTasks, loading: loadingTasks } = useSelector((state) => state.tasks);
  const { token } = useSelector((state) => state.auth);
  const { profileData } = useSelector((state) => state.profile);
  // console.log("profileData", profileData)
  console.log("triggeredTasks", triggeredTasks)
  // console.log("tasks", tasks)

  const [visible, setVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedMood, setSelectedMood] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fallbackImage = require("../../../../assets/png/twinkle.png");

  const achievements = getAchievementsCount(profileData?.totalPoints || 0);

  /** -------------------------------
   * FETCH DATA WHEN SCREEN FOCUSES
   --------------------------------*/
  useEffect(() => {
    if (token) {
      dispatch(getTodayTasks(token));
      dispatch(fetchUserProfile(token));
      dispatch(getTriggeredTasks(token));
      dispatch(triggerTasks(token))
    }
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
      await dispatch(markAsDoneTask({ taskId: selectedTask._id, done: true, token }));
      ToastAndroid.show("Task marked as done!", ToastAndroid.SHORT);

      await dispatch(getTriggeredTasks(token));
      setVisible(false);

      navigation.navigate("TaskCompleted", { selectedTask });
    } catch {
      ToastAndroid.show("Something went wrong!", ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };

  const handleUndo = async () => {
    if (!selectedTask) return;

    setLoading(true);
    try {
      await dispatch(undoTask({ taskId: selectedTask._id, token }));
      ToastAndroid.show("Task reverted!", ToastAndroid.SHORT);

      await dispatch(getTriggeredTasks(token));
      setVisible(false);
    } catch {
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
        await dispatch(getTriggeredTasks(token));
        await dispatch(fetchUserProfile(token));
      }
    } catch (err) {
      console.log("Refresh error:", err);
    } finally {
      setRefreshing(false);
    }
  };

  /** -------------------------------
   * TODAY'S TASK FILTER
   --------------------------------*/
  const today = new Date().toISOString().split("T")[0];
  const todaysTask = triggeredTasks?.find((t) => t.time?.split("T")[0] === today);


  const streakValue = Number(profileData?.streak?.value || 0);
  if (loadingTasks) {
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
            Good morning, {profileData?.username || "User"}!
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
        <StatsSection stats={profileData} achievements={achievements} />
        <StreakProgress progress={streakValue} title="Streak Saver Badge" />

        {/* Today's Task Header */}
        <View style={styles.header}>
          <Text style={styles.taskText}>Today's Task</Text>
          <IconButton
            onPress={() => navigation.navigate("AddTask")}
            iconSrc={require("../../../../assets/png/add.png")}
          />
        </View>

        {/* Tasks */}
        {todaysTask ? (
          todaysTask.done ? (
            <TaskCompletedMessage
              onPress={() => {
                navigation.navigate("DailyStreak", { item: selectedTask, profileData })
              }}
              undoTask={() => {
                setSelectedTask(todaysTask);
                setVisible(true);
              }}
            />
          ) : (
            <TaskCard
              task={todaysTask}
              navigation={navigation}
              onPress={() => navigation.navigate("DailyStreak", { item: selectedTask, profileData })}
              onSkip={() => {
                setSelectedTask(todaysTask);
                setVisible(true);
              }}
              onDone={() => {
                setSelectedTask(todaysTask);
                setVisible(true);
              }}
              loading={loading}
            />
          )
        ) : (
          <NoTaskAssigned navigation={navigation} />
        )}

        <QuotesSection />
        <MoodSection navigation={navigation} selectedMood={selectedMood} setSelectedMood={setSelectedMood} />
      </ScrollView>

      {/* Bottom Sheet */}
      <BottomSheet visible={visible} onClose={() => setVisible(false)}>
        <CompleteTask
          selectedTask={selectedTask}
          onUndo={handleUndo}
          onDone={handleDone}
        />
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
