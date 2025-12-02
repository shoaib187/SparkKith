import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { FONT_SIZES } from '../../constants/sizes/responsiveFont'

export default function StreakProgress({ title, progress = 0, isProfile = true, streakValue }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>

      <View style={styles.progressBarBackground}>
        <View
          style={[
            styles.progressBarFill,
            { width: `${progress}%` }
          ]}
        />
        {streakValue > 0 && <Text style={{
          left: `${streakValue > 3 ? progress : 20}%`,
          position: 'absolute',
          transform: [{ translateX: -36 }],
        }}>
          {streakValue}/14
        </Text>
        }

        {!streakValue &&
          <Text style={{
            left: `${progress}%`,
            position: 'absolute',
            transform: [{ translateX: -36 }],
          }}>
            {Math.round(progress)} {isProfile && "%"}
          </Text>
        }
        <View style={[styles.progressBarLine, { width: `${progress - 4}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: 14
  },
  sectionTitle: {
    marginVertical: 12,
    fontSize: FONT_SIZES.md,
    fontWeight: '900'
  },

  progressBarBackground: {
    height: 24,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative', // ✅ required for absolute children
    padding: 2
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#FFB858',
    borderRadius: 50,
  },
  progressBarLine: {
    position: 'absolute', // ✅ ensures it floats over the fill
    top: 6,
    bottom: 0,
    width: 2,             // thinner line instead of full width
    backgroundColor: '#ffffff40',
    zIndex: 10,
    height: 4,
    marginRight: 10,
    marginLeft: 12,
    borderRadius: 20
  },
})
