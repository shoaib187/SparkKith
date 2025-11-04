import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import colors from '../constants/colors/colors'

export default function CommunityStats({ stats }) {
  return (
    <View style={styles.communityCard}>
      <Text style={styles.subTitle}>Your Community</Text>
      <View style={styles.communityHeader}>
        <Text style={styles.emoji}>🌿</Text>
        <Text style={styles.communityName}>Zen Den</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.emoji}>🔥</Text>
          <Text style={styles.statValue}>2</Text>
          <Text style={styles.statLabel}>Streak</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.emoji}>⭐</Text>
          <Text style={styles.statValue}>10</Text>
          <Text style={styles.statLabel}>Points</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.emoji}>🏅</Text>
          <Text style={styles.statValue}>0</Text>
          <Text style={styles.statLabel}>Badge</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  communityCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  subTitle: {
    fontSize: 13,
    color: "#6B7280",
  },
  communityHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  communityName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginLeft: 6,
  },
  emoji: {
    fontSize: 20,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 12,
    gap: 8
  },
  statBox: {
    alignItems: "center",
    backgroundColor: colors.lightPink, flex: 1,
    paddingVertical: 10,
    borderRadius: 12
  },
  statValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginVertical: 2,
  },
  statLabel: {
    fontSize: 12,
    color: "#6B7280",
  },
})