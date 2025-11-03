import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const days = ['Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'];

export default function DailyStreak() {
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
      <Image
        source={require('../../../../assets/icons/flame.png')}
        style={styles.flame}
      />
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
              style={[
                styles.dayCircle,
                isToday && styles.todayCircle,
                isCompleted && styles.completedCircle,
              ]}
            >
              <Text
                style={[
                  styles.dayText,
                  isCompleted && styles.dayTextCompleted,
                ]}
              >
                {day}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Text style={styles.description}>
        Awesome work! Stay consistent. Keep your self-care streak going in SparkKith!
      </Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>LET’S GO!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BFE8F7',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  flame: {
    width: 100,
    height: 100,
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
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    width: '90%',
    marginBottom: 25,
  },
  dayCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E5E7EB',
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
    fontWeight: '500',
  },
  dayTextCompleted: {
    color: '#fff',
  },
  description: {
    textAlign: 'center',
    color: '#334155',
    fontSize: 14,
    width: '80%',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#FFB400',
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 50,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
