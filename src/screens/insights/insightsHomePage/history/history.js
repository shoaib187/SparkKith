import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../../../../components/common/header/header';
import IconButton from '../../../../components/common/iconbutton/iconButton';
import MonthPagingTimeline from '../../../../components/common/monthPagingTimeline/monthPagingTimeline';
import Tabs from '../../../../components/common/task/tabs';
import Task from '../../../../components/common/task/task';
import MoodCard from '../../../../components/common/moodCard/moodCard';

import colors from '../../../../components/constants/colors/colors';
import { FONT_SIZES } from '../../../../components/constants/sizes/responsiveFont';

import { getTriggeredTasks } from '../../../../redux/slices/taskSlice/taskSlice';
import { getFeelingsByDate } from '../../../../redux/slices/feelingSlice/feelingSlice';

// Mood data
const moods = [
  { id: "neutral", label: "Okay", icon: require("../../../../../assets/icons/okay.png") },
  { id: "happy", label: "Good", icon: require("../../../../../assets/icons/good.png") },
  { id: "excited", label: "Great", icon: require("../../../../../assets/icons/great.png") },
  { id: "sad", label: "Sad", icon: require("../../../../../assets/icons/sad.png") },
  { id: "angry", label: "Angry", icon: require("../../../../../assets/icons/angry.png") },
];

export default function History({ navigation }) {
  const dispatch = useDispatch();

  // const { tasks } = useSelector((state) => state?.tasks);
  const { triggeredTasks } = useSelector((state) => state.tasks);
  const { feelingsByDate } = useSelector(state => state.feelings);
  const { token } = useSelector((state) => state?.auth);

  const [activeTab, setActiveTab] = useState('task');
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Fetch triggered tasks on mount
  useEffect(() => {
    if (token) {
      dispatch(getTriggeredTasks(token));
    }
  }, [token, dispatch]);

  // Helper: Get mood icon by ID
  const getMoodIcon = (moodId) => {
    const mood = moods.find(m => m.id.toLowerCase() === moodId?.toLowerCase());
    return mood ? mood.icon : moods[0].icon;
  };

  // Filter tasks based on the selected date
  const tasksForSelectedDate = useMemo(() => {
    const selectedDateStr = selectedDate.toISOString().split('T')[0];
    return triggeredTasks?.filter(task => task.date?.split('T')[0] === selectedDateStr);
  }, [triggeredTasks, selectedDate]);

  // Map tasks into UI-friendly objects
  const suggestions = useMemo(() => {
    return tasksForSelectedDate.map(task => ({
      id: task._id,
      title: task.title,
      desc: task.description,
      status: Boolean(task.done),
      date: task.date,
    }));
  }, [tasksForSelectedDate]);

  // Fetch mood logs for selected date
  const handleGetFeelings = (date) => {
    if (!date) return;

    dispatch(getFeelingsByDate({
      token,
      payload: { date }
    }));
  };

  // On date selection
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    const dateStr = date.toISOString().split('T')[0];
    handleGetFeelings(dateStr);
  };

  return (
    <View style={styles.container}>
      <Header title="History" navigation={navigation} />

      <View style={styles.innerContainer}>
        <Text style={styles.dateText}>
          {selectedDate.toLocaleDateString('en-US', {
            weekday: 'long',
            day: 'numeric',
            month: 'short',
          })}
        </Text>

        <MonthPagingTimeline
          onDateSelect={handleDateSelect}
          selectedDate={selectedDate}
          sessionsData={{}}
        />

        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

        <View style={styles.headerRow}>
          <Text style={styles.tabTitle}>{activeTab}</Text>

          {activeTab === "task" && (
            <IconButton
              onPress={() => navigation.navigate("AddTask")}
              iconSrc={require('../../../../../assets/png/add.png')}
            />
          )}
        </View>

        {activeTab === 'task' ? (
          <FlatList
            data={suggestions}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No tasks found for this date</Text>
            }
            renderItem={({ item }) => <Task item={item} />}
          />

        ) : (
          <View>
            {feelingsByDate?.length === 0 ? (
              <Text style={styles.emptyText}>No moods recorded for this date</Text>
            ) : (
              feelingsByDate.map((entry) => (
                <MoodCard
                  key={entry._id}
                  mood={entry.feeling}
                  time={entry.createdAt?.slice(0, 10)}
                  note={entry.note}
                  icon={getMoodIcon(entry.feeling)}
                  tags={(entry.reasons || []).map(r => ({ label: r }))}
                />
              ))
            )}
          </View>
        )}
      </View>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
  },
  innerContainer: {
    paddingHorizontal: 16,
  },
  dateText: {
    fontSize: FONT_SIZES.md,
    color: colors.textPrimary,
    marginVertical: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  tabTitle: {
    fontSize: FONT_SIZES.lg * 0.9,
    fontWeight: '900',
    textTransform: 'capitalize',
    color: colors.textPrimary,
  },
  listContainer: {
    paddingBottom: 80,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: colors.textSecondary,
  },
});
