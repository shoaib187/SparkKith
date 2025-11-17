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

export default function InsightsHomePage({ navigation }) {
  const [selected, setSelected] = useState('');
  const [activeTab, setActiveTab] = useState("task");
  const [visible, setVisible] = useState(false)

  const dots = {
    work: { key: 'work', color: '#6FA8DC' },   // light blue
    gym: { key: 'gym', color: '#93C47D' },    // light green
    relax: { key: 'relax', color: '#E06666' }, // light red
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
                setSelected(day.dateString)
                setVisible(!visible)
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
      <BottomSheet visible={visible} onClose={() => setVisible(!visible)}>
        {selected ? (
          <Text style={{ marginTop: 20, fontSize: 17, textAlign: 'center', fontWeight: '900' }}>
            Selected Date: {selected}
          </Text>
        ) : null}
        <MoodCard
          mood="Sad"
          time="12:00 PM"
          icon={require("../../../../assets/icons/sad.png")}
          style={{ borderWidth: 1, borderColor: '#eee' }}
        />

        <MoodCard
          mood="Good"
          time="06:00 PM"
          icon={require("../../../../assets/icons/good.png")}
          tags={[
            { label: "Me", icon: require("../../../../assets/reasons/me.png") },
            { label: "Study", icon: require("../../../../assets/reasons/study.png") },
            { label: "Family", icon: require("../../../../assets/reasons/family.png") },
            { label: "Friends", icon: require("../../../../assets/reasons/friends.png") },
          ]}
          note="I am feeling exhausted."
          style={{ borderWidth: 1, borderColor: '#eee' }}
        />

        <MoodCard
          mood="Greate"
          time="12:00 PM"
          icon={require("../../../../assets/icons/great.png")}
          style={{ borderWidth: 1, borderColor: '#eee' }}
        />
      </BottomSheet>
    </View>
  );
}
