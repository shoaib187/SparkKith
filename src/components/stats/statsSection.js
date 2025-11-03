import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { FONT_SIZES } from '../constants/sizes/responsiveFont'
import colors from '../constants/colors/colors'


export default function StatsSection() {
  return (
    <View style={styles.statsRow}>
      <View style={styles.statCard}>
        <Text style={styles.statEmoji}>🔥</Text>
        <Text style={styles.statNumber}>2</Text>
        <Text style={styles.statLabel}>Streak</Text>
      </View>

      <View style={styles.statCard}>
        <Text style={styles.statEmoji}>🏆</Text>
        <Text style={styles.statNumber}>10</Text>
        <Text style={styles.statLabel}>Points</Text>
      </View>

      <View style={styles.statCard}>
        <Text style={styles.statEmoji}>🎖️</Text>
        <Text style={styles.statNumber}>1</Text>
        <Text style={styles.statLabel}>Badge</Text>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  statsRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    marginTop: 14
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    marginHorizontal: 6,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  statEmoji: { fontSize: 22, marginBottom: 6 },
  statNumber: { fontSize: FONT_SIZES.lg, fontWeight: '900', color: '#111827' },
  statLabel: {
    fontSize: FONT_SIZES.sm,
    color: colors.description,
    marginTop: 4
  },


})