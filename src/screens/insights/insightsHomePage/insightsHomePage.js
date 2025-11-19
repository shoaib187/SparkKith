import { View, Text, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { Calendar } from 'react-native-calendars';
import colors from '../../../components/constants/colors/colors';
import Header from '../../../components/common/header/header';
import Tabs from '../../../components/common/task/tabs';
import MyBarChart from '../../../components/common/barchart/barchart';
import TaskActivityChart from '../../../components/common/timeRangeDropdown/timeRangeDropdown';
import BottomSheet from '../../../components/common/bottomSheet/bottomSheet';
import MoodCard from '../../../components/common/moodCard/moodCard';
import { useDispatch, useSelector } from 'react-redux';
import { getFeelingsByDate } from '../../../redux/slices/feelingSlice/feelingSlice';

export default function InsightsHomePage({ navigation }) {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState('');
  const [activeTab, setActiveTab] = useState("task");
  const [visible, setVisible] = useState(false)
  const { token } = useSelector(state => state.auth)
  const { feelingsByDate } = useSelector(state => state.feelings)
  console.log("feelingsByDate", feelingsByDate)

  const handleGetFeelings = (date) => {
    if (!date) return;

    dispatch(getFeelingsByDate({
      token,
      payload: { date }  // pass the date in the payload
    }));
  };


  const dots = {
    work: { key: 'work', color: '#6FA8DC' },   // light blue
    gym: { key: 'gym', color: '#93C47D' },    // light green
    relax: { key: 'relax', color: '#E06666' }, // light red
  };


  // Capitalize first letter of mood string
  const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

  // Return mood icon based on feeling
  const getIconForMood = (feeling) => {
    switch (feeling.toLowerCase()) {
      case 'sad':
        return require("../../../../assets/icons/sad.png");
      case 'good':
        return require("../../../../assets/icons/good.png");
      case 'great':
        return require("../../../../assets/icons/great.png");
      case 'excited':
        return require("../../../../assets/icons/fire.png");
      default:
        return require("../../../../assets/icons/good.png");
    }
  };



  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  return (
    <View style={{ flex: 1, backgroundColor: colors.bgColor }}>
      <Header onSettingPress={() => navigation.navigate("History")} navigation={navigation} title={"Insights"} showCalendar showBack={false} />
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16 }}>
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === "task" ? <TaskActivityChart /> : (
          <View>
            <Calendar
              onDayPress={day => {
                setSelected(day.dateString);
                setVisible(true);
                handleGetFeelings(day.dateString);
              }}
              markingType={'multi-dot'}
              markedDates={{
                '2025-11-05': { dots: [dots.work, dots.gym] },
                '2025-11-06': { dots: [dots.relax] },
                '2025-11-07': { dots: [dots.work, dots.relax, dots.gym] },
                [today]: {
                  marked: true,
                  dots: [dots.work],
                  selected: true,
                  selectedColor: colors.buttonColor, // <-- Custom color for today's circle
                },
                [selected]: {
                  selected: true,
                  selectedColor: colors.buttonColor,
                },
              }}
              theme={{
                todayTextColor: '#fff',
                arrowColor: 'blue',
              }}
            />
            <MyBarChart />
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
              icon={getIconForMood(item.feeling)} // helper function to return icon based on mood
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
