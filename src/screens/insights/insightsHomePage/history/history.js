import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import Header from '../../../../components/common/header/header';
import IconButton from '../../../../components/common/iconbutton/iconButton';
import MonthPagingTimeline from '../../../../components/common/monthPagingTimeline/monthPagingTimeline';
import Tabs from '../../../../components/common/task/tabs';
import Task from '../../../../components/common/task/task';
import colors from '../../../../components/constants/colors/colors';
import { FONT_SIZES } from '../../../../components/constants/sizes/responsiveFont';
import MoodCard from '../../../../components/common/moodCard/moodCard';

export default function History({ navigation }) {
  const [activeTab, setActiveTab] = useState('task');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const suggestions = [
    {
      id: '1',
      icon: require('../../../../../assets/png/goal.png'),
      title: 'Focus Session',
      desc: 'Block distractions and stay on one task.',
      status: 'pending',
    },
    {
      id: '2',
      icon: require('../../../../../assets/png/goal.png'),
      title: 'Stretch Break',
      desc: 'Relax your muscles and reset your posture.',
      status: 'done',
    },
    {
      id: '3',
      icon: require('../../../../../assets/png/goal.png'),
      title: 'Meditation',
      desc: 'Calm your mind and improve focus.',
      status: 'skipped',
    },
    {
      id: '4',
      icon: require('../../../../../assets/png/goal.png'),
      title: 'Meditation',
      desc: 'Calm your mind and improve focus.',
      status: 'done',
    },
  ];

  const [sessionsData] = useState({
    [new Date().toISOString().split('T')[0]]: [
      {
        id: 1,
        title: 'Yoga Meditation Session',
        time: '10:00 AM',
        duration: '60 mins',
        instructor: 'John Doe',
        level: 'Beginner',
        participants: 15,
        maxParticipants: 20,
      },
      {
        id: 2,
        title: 'Advanced Pranayama',
        time: '2:00 PM',
        duration: '45 mins',
        instructor: 'Jane Smith',
        level: 'Advanced',
        participants: 18,
        maxParticipants: 25,
      },
    ],
    [new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]]: [
      {
        id: 3,
        title: 'Morning Flow Yoga',
        time: '8:00 AM',
        duration: '75 mins',
        instructor: 'Mike Johnson',
        level: 'Intermediate',
        participants: 12,
        maxParticipants: 15,
      },
    ],
  });

  const handleDateSelect = (date) => setSelectedDate(date);

  return (
    <View style={styles.container}>
      <Header title="History" navigation={navigation} />

      <View style={styles.innerContainer}>
        <Text style={styles.dateText}>Today, Friday 19 Nov</Text>

        <MonthPagingTimeline
          onDateSelect={handleDateSelect}
          selectedDate={selectedDate}
          sessionsData={sessionsData}
        />

        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

        <View style={styles.headerRow}>
          <Text style={styles.tabTitle}>{activeTab}</Text>
          <IconButton iconSrc={require('../../../../../assets/png/add.png')} />
        </View>

        {activeTab === 'task' ? (
          <FlatList
            data={suggestions}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => <Task item={item} />}
          />
        ) : (
          <View>
            <MoodCard
              mood="Sad"
              time="12:00 PM"
              icon={require("../../../../../assets/icons/sad.png")}
            />

            <MoodCard
              mood="Good"
              time="06:00 PM"
              icon={require("../../../../../assets/icons/good.png")}
              tags={[
                { label: "Me", icon: require("../../../../../assets/reasons/me.png") },
                { label: "Study", icon: require("../../../../../assets/reasons/study.png") },
                { label: "Family", icon: require("../../../../../assets/reasons/family.png") },
                { label: "Friends", icon: require("../../../../../assets/reasons/friends.png") },
              ]}
              note="I am feeling exhausted."
            />

            <MoodCard
              mood="Greate"
              time="12:00 PM"
              icon={require("../../../../../assets/icons/great.png")}
            />
          </View>
        )}
      </View>
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
    flex: 1,
    color: colors.textPrimary,
  },
  listContainer: {
    paddingBottom: 80,
  },
});
