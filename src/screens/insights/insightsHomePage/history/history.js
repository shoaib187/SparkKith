import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
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
import { moods } from '../../../../utils/services/services';


export default function History({ navigation }) {
  const dispatch = useDispatch();
  const { triggeredTasks } = useSelector((state) => state.tasks);
  const { feelingsByDate } = useSelector(state => state.feelings);
  const { token } = useSelector((state) => state?.auth);

  const [activeTab, setActiveTab] = useState('task');
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    if (token) dispatch(getTriggeredTasks(token));
  }, [token, dispatch]);

  const getMoodIcon = (moodId) => {
    const mood = moods.find(m => m.id.toLowerCase() === moodId?.toLowerCase());
    return mood ? mood.icon : moods[0].icon;
  };

  const tasksForSelectedDate = useMemo(() => {
    const selectedDateStr = selectedDate.toISOString().split('T')[0];
    return triggeredTasks?.filter(task => task.date?.split('T')[0] === selectedDateStr) || [];
  }, [triggeredTasks, selectedDate]);


  const handleGetFeelings = (date) => {
    if (!date) return;
    dispatch(getFeelingsByDate({ token, payload: { date } }));
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    const dateStr = date.toISOString().split('T')[0];
    handleGetFeelings(dateStr);
  };

  // Get content for active tab
  const renderContent = () => {
    if (activeTab === 'task') {
      return (
        <>
          {tasksForSelectedDate?.length === 0 ? (
            <Text style={styles.emptyText}>No moods recorded for this date</Text>
          ) : (
            tasksForSelectedDate.map((item) => (
              <Task item={item} />
            ))
          )}
        </>
      );
    } else {
      return (
        <View style={styles.moodContainer}>
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
      );
    }
  };

  return (
    <View style={styles.container}>
      <Header title="History" navigation={navigation} />
      <View style={styles.mainContent}>
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
        </View>
        <View style={styles.tabsContainer}>
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
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.contentContainerStyle}>
        {renderContent()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
  },
  innerContainer: {
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  tabsContainer: {
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  contentContainer: {
    flex: 1,
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
    marginVertical: 8,
  },
  tabTitle: {
    fontSize: FONT_SIZES.lg * 0.9,
    fontWeight: '900',
    textTransform: 'capitalize',
    color: colors.textPrimary,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: colors.textSecondary,
    fontSize: FONT_SIZES.sm,
  },
  moodContainer: {
    paddingTop: 10,
  },
  contentContainerStyle: {
    paddingHorizontal: 14
  }
});