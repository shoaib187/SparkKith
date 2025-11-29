import { View, Text, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Calendar } from 'react-native-calendars';
import colors from '../../../components/constants/colors/colors';
import Header from '../../../components/common/header/header';
import Tabs from '../../../components/common/task/tabs';
import MyBarChart from '../../../components/common/barchart/barchart';
import TaskActivityChart from '../../../components/common/taskActivityChart/taskActivityChart';
import BottomSheet from '../../../components/common/bottomSheet/bottomSheet';
import MoodCard from '../../../components/common/moodCard/moodCard';
import { useDispatch, useSelector } from 'react-redux';
import { getFeelingAnalytics, getFeelingsByDate } from '../../../redux/slices/feelingSlice/feelingSlice';
import { getTaskAnalytics } from '../../../redux/slices/taskSlice/taskSlice';
import InsightsSkeleton from '../../../components/skeletons/insightsSkeleton/insightsSkeleton';

export default function InsightsHomePage({ navigation }) {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState('');
  const [activeTab, setActiveTab] = useState("task");
  const [visible, setVisible] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("Monthly"); // Add this state

  const { token } = useSelector(state => state.auth)
  const { feelingsByDate, analytics } = useSelector(state => state.feelings)
  const { taskAnalytics, loading } = useSelector(state => state.tasks)

  // console.log("analytics", taskAnalytics)

  // Get current date
  const currentDay = new Date();

  // Start of the current month
  const startOfMonth = new Date(currentDay.getFullYear(), currentDay.getMonth(), 1);

  // End date = today (ongoing month)
  const endOfMonth = new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate(), 23, 59, 59, 999);

  // Final payload
  const payload = {
    period: {
      start: startOfMonth.toISOString(),
      end: endOfMonth.toISOString()
    }
  };

  useEffect(() => {
    dispatch(getFeelingAnalytics({ payload, token }))
    dispatch(getTaskAnalytics({ period: selectedPeriod.toLowerCase(), token })) // Use selectedPeriod
  }, [dispatch, token, selectedPeriod]) // Add selectedPeriod to dependencies

  // Add this function to handle period changes
  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
    // The useEffect will automatically trigger when selectedPeriod changes
  };

  const handleGetFeelings = (date) => {
    if (!date) return;

    dispatch(getFeelingsByDate({
      token,
      payload: { date }  // pass the date in the payload
    }));
  };

  const dots = {
    work: { key: 'work', color: '#6FA8DC' },
  };

  // Capitalize first letter of mood string
  const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

  // Return mood icon based on feeling
  const getIconForMood = (feeling) => {
    switch (feeling.toLowerCase()) {
      case 'sad':
        return require("../../../../assets/icons/sad.png");
      case 'happy':
        return require("../../../../assets/icons/good.png");
      case 'great':
        return require("../../../../assets/icons/great.png");
      case 'excited':
        return require("../../../../assets/icons/great.png");
      case 'neutral':
        return require("../../../../assets/icons/okay.png");
      default:
        return require("../../../../assets/icons/angry.png");
    }
  };

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  if (loading) {
    return <InsightsSkeleton />
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.bgColor }}>
      <Header onSettingPress={() => navigation.navigate("History")} navigation={navigation} title={"Insights"} showCalendar showBack={false} />
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16 }}>
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === "task" ? (
          <TaskActivityChart
            analytics={taskAnalytics}
            selectedRange={selectedPeriod}
            onSelectRange={handlePeriodChange} // Pass the handler
          />
        ) : (
          <View>
            <Calendar
              onDayPress={day => {
                setSelected(day.dateString);
                setVisible(true);
                handleGetFeelings(day.dateString);
              }}
              markedDates={{
                [today]: {
                  marked: true,
                  dots: [dots.work],
                  selected: true,
                  selectedColor: colors.buttonColor,
                },
                [selected]: {
                  selected: true,
                  selectedColor: colors.buttonColor,
                },
              }}
              theme={{
                todayTextColor: colors.buttonColor,
                arrowColor: 'red',
              }}
            />
            <MyBarChart analytics={analytics} />
          </View>
        )}
      </ScrollView>
      <BottomSheet visible={visible} onClose={() => setVisible(false)}>
        {selected && (
          <Text
            style={{
              marginTop: 20,
              fontSize: 17,
              textAlign: 'center',
              fontWeight: '900',
            }}
          >
            Selected Date: {selected}
          </Text>
        )}

        {feelingsByDate && feelingsByDate.length > 0 ? (
          feelingsByDate.map((item, index) => (
            <MoodCard
              key={item._id || index}
              mood={capitalizeFirstLetter(item.feeling)}
              time={new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              icon={getIconForMood(item.feeling)}
              tags={item.reason?.map(r => ({ label: r })) || []}
              note={item.note}
              style={{ borderWidth: 1, borderColor: '#eee', marginVertical: 8 }}
            />
          ))
        ) : (
          <Text style={{ textAlign: 'center', marginVertical: 20 }}>
            No moods recorded for this date
          </Text>
        )}
      </BottomSheet>
    </View>
  );
}
