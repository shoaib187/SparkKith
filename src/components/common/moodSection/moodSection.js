import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React, { useState } from 'react';

import { FONT_SIZES } from '../../constants/sizes/responsiveFont';
import colors from '../../constants/colors/colors';

export default function MoodSection({ navigation }) {
  const [selectedMood, setSelectedMood] = useState(null);

  const moods = [
    { id: 1, label: 'Okay', image: require('../../../../assets/icons/okay.png') },
    { id: 2, label: 'Good', image: require('../../../../assets/icons/good.png') },
    { id: 3, label: 'Great', image: require('../../../../assets/icons/great.png') },
    { id: 4, label: 'Sad', image: require('../../../../assets/icons/sad.png') },
    { id: 5, label: 'Angry', image: require('../../../../assets/icons/angry.png') },
  ];

  return (
    <View style={styles.moodSection}>
      <Text style={styles.sectionTitle}>How are you feeling right now?</Text>
      <View style={styles.moodRow}>
        {moods.map((mood) => (
          <TouchableOpacity
            key={mood.id}
            style={[
              styles.moodItem,
              selectedMood === mood.id && styles.selectedMood,
            ]}
            onPress={() => {
              setSelectedMood(mood.id)
              navigation.navigate("ReflectMood")
            }
            }
            activeOpacity={0.8}
          >
            <Image source={mood.image} style={styles.moodImage} />
            <Text
              style={[
                styles.moodLabel,
                selectedMood === mood.id && styles.selectedText,
              ]}
            >
              {mood.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  moodSection: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: '900',
  },
  moodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: 12
  },
  moodItem: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
  },
  moodImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  moodLabel: {
    marginTop: 6,
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  selectedMood: {
    backgroundColor: '#FDE68A',
    borderColor: '#F59E0B',
    borderWidth: 1,
  },
  selectedText: {
    color: '#F59E0B',
    fontWeight: '700',
  },
});
