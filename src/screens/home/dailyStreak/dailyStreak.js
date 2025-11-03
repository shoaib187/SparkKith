import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../../../components/constants/colors/colors';
import Button from '../../../components/common/button/button';
import { FONT_SIZES } from '../../../components/constants/sizes/responsiveFont';

const days = ['Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'];

export default function DailyStreak({ navigation }) {
  const [today, setToday] = useState(null);
  const [completedDays, setCompletedDays] = useState([]);

  useEffect(() => {
    const currentDay = new Date().getDay(); // Sunday = 0
    const mappedDay = currentDay === 0 ? 1 : currentDay + 1; // Aligning Sa as index 0
    setToday(mappedDay % 7);
  }, []);

  const handleDayPress = (index) => {
    if (index === today) {
      setCompletedDays((prev) =>
        prev.includes(index)
          ? prev.filter((d) => d !== index)
          : [...prev, index]
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ position: "relative" }}>
        <Image
          source={require('../../../../assets/png/glowing.png')}
          style={[styles.flame, { transform: [{ scale: 3 }], position: "absolute", }]}
        />
        <Image
          source={require('../../../../assets/icons/flame.png')}
          style={styles.flame}
        />
      </View>
      <Text style={styles.number}>1</Text>
      <Text style={styles.dayStreak}>Day Streak</Text>
      <View style={styles.daysContainer}>
        {days.map((day, index) => {
          const isToday = index === today;
          const isCompleted = completedDays.includes(index);
          return (
            <TouchableOpacity
              key={day}
              onPress={() => handleDayPress(index)}
              style={styles.dayPicker}
            >
              <Text
                style={[
                  styles.dayText,
                  isCompleted && styles.dayTextCompleted,
                ]}
              >
                {day}
              </Text>
              <View style={[
                styles.dayCircle,
                isToday && styles.todayCircle,
                isCompleted && styles.completedCircle,
              ]} />
            </TouchableOpacity>
          );
        })}
      </View>

      <Text style={styles.description}>
        Awesome work! Stay consistent. Keep your self-care streak going in SparkKith!
      </Text>

      <Button title='LET’S GO!' onPress={() => navigation.navigate("TaskCompleted")} style={{ width: '100%' }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14
  },
  flame: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  number: {
    fontSize: 70,
    fontWeight: 'bold',
    color: '#fff',
  },
  dayStreak: {
    fontSize: 22,
    color: '#fff',
    marginBottom: 25,
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff54',
    borderRadius: 12,
    padding: 10,
    marginBottom: 25,
    width: '100%'
  },
  dayCircle: {
    width: 30,
    height: 30,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#29292916',
  },
  todayCircle: {
    borderWidth: 2,
    borderColor: '#FB923C',
  },
  completedCircle: {
    backgroundColor: '#FB923C',
  },
  dayText: {
    color: '#333',
    fontWeight: '800',
  },
  dayTextCompleted: {
    color: '#fff',
  },
  description: {
    textAlign: 'center',
    color: colors.description,
    fontSize: FONT_SIZES.md,
    width: '90%',
    marginBottom: 30,
  },
  dayPicker: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6
  }
});
