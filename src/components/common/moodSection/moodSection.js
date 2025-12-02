import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React from 'react';

import { FONT_SIZES } from '../../constants/sizes/responsiveFont';
import colors from '../../constants/colors/colors';
import Button from '../button/button';
import { moods } from '../../../utils/services/services';

export default function MoodSection({ navigation, selectedMood, setSelectedMood }) {

  return (
    <View style={styles.moodSection}>
      <Text style={styles.sectionTitle}>How are you feeling right now?</Text>
      <View style={styles.moodContent}>
        <View style={styles.moodRow}>
          {moods?.map((mood) => (
            <TouchableOpacity
              key={mood.id}
              style={[
                styles.moodItem,
                selectedMood === mood.id && styles.selectedMood,
              ]}
              onPress={() => {
                setSelectedMood(mood.id);
              }}
              activeOpacity={0.8}
            >
              <Image source={mood.icon} style={styles.moodImage} />
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
        {selectedMood &&
          <View style={styles.actionWrapper}>
            <Button style={{ width: '48%' }} title='Reflect' onPress={() => navigation.navigate("ReflectMood", { selectedMood })} />
            <Button style={{ width: '48%', backgroundColor: colors.lightBg, borderWidth: 1, borderColor: '#eee' }} title='Cancel' onPress={() => setSelectedMood(null)} textColor='black' />
          </View>
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  moodSection: {
    marginTop: 24,
  },
  moodContent: {
    backgroundColor: colors.white,
    borderRadius: 14,
    marginTop: 16,
    padding: 12
  },
  sectionTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: '900',
  },
  moodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    backgroundColor: '#FDE68A30',
    borderColor: '#F59E0B',
    borderWidth: 1,
  },
  selectedText: {
    color: '#F59E0B',
    fontWeight: '700',
  },
  actionWrapper: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 12,
    justifyContent: 'space-between',
  }
});
