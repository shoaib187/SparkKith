import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { FONT_SIZES } from '../../constants/sizes/responsiveFont'

export default function StreakProgress() {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Streak Saver Badge</Text>
      <View style={styles.progressBarBackground}>
        <View style={[styles.progressBarFill, { width: '45%' }]} />
        <View style={[styles.progressBarLine, { width: '38%' }]} />
        <Text style={{ left: '30%', position: 'absolute', }}>3/5</Text>
      </View>
    </View>
  )
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