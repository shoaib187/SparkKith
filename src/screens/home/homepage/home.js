import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import StatsSection from '../../../components/stats/statsSection';
import StreakProgress from '../../../components/common/streakProgress/streakProgress';
import IconButton from '../../../components/common/iconbutton/iconButton';
import TaskCard from '../../../components/common/taskCard/taskCard';
import QuotesSection from '../../../components/common/qoutesSection/qoutesSection';
import MoodSection from '../../../components/common/moodSection/moodSection';

import { FONT_SIZES } from '../../../components/constants/sizes/responsiveFont';
import colors from '../../../components/constants/colors/colors';
import Button from '../../../components/common/button/button';
import BottomSheet from '../../../components/common/bottomSheet/bottomSheet';
import CompleteTask from '../../../components/common/completeTask/completeTask';



export default function Home({ navigation }) {
  const [visible, setVisible] = useState(false);
  const heroImage = require('../../../../assets/png/twinkle.png');
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >

        {/* Top stat cards */}
        <StatsSection />

        {/* Streak Badge */}
        <StreakProgress />

        {/* Today's Task card */}
        <View style={styles.header}>
          <Text style={styles.taskText}>Today's Task</Text>
          <IconButton onPress={() => navigation.navigate("AddTask")} iconSrc={require("../../../../assets/png/add.png")} />
        </View>
        <TaskCard navigation={navigation} onDone={() => navigation.navigate("DailyStreak")} />

        {/* Cheer Dose */}
        <QuotesSection />

        {/* Mood selector */}
        <MoodSection navigation={navigation} />
        <Button title="Open Bottom Sheet" onPress={() => setVisible(true)} />
        <BottomSheet visible={visible} onClose={() => setVisible(false)}>
          <CompleteTask />
        </BottomSheet>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bgColor },
  imageWrapper: {
    width: 50, height: 50, borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  container: {
    paddingHorizontal: 16
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10
  },
  greeting: {
    flex: 1,
    paddingLeft: 12
  },
  greetingSmall: {
    fontSize: FONT_SIZES.md,
    fontWeight: '700',
    marginTop: 4
  },
  greetingLarge: {
    color: colors.description,
    fontSize: FONT_SIZES.sm
  },
  avatar: {
    width: 40, height: 40,
    resizeMode: 'contain'
  },


  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 12
  },
  taskText: {
    fontSize: FONT_SIZES.md,
    fontWeight: '900'
  },
});