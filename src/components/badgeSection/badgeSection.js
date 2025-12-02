import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { FONT_SIZES } from '../constants/sizes/responsiveFont'
import colors from '../constants/colors/colors'

export default function BadgeSection({ badges }) {
  return (
    <View style={styles.badgeWrapper}>
      <Text style={styles.sectionTitle}>Badge Gallery</Text>
      <View style={styles.badgeGrid}>
        {badges?.map(badge => (
          <View
            key={badge.id}
            style={[styles.badgeCard, !badge.unlocked && styles.inactiveBadge]}
          >
            <Image source={badge.emoji} style={{ width: 70, height: 70 }} />
            <Text style={[styles.badgeName, !badge.unlocked && styles.inactiveText]}>
              {badge?.title}
            </Text>

            {/* Progress Bar */}
            <View style={styles.progressBarContainer}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: `${(badge.progress / 10) * 100}%` }
                ]}
              />
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  badgeWrapper: {
    marginTop: 18
  },
  sectionTitle: {
    marginBottom: 16,
    fontSize: FONT_SIZES.lg * .9,
    fontWeight: "900"
  },
  badgeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  badgeCard: {
    backgroundColor: "#FFF",
    width: "30%",
    borderRadius: 12,
    alignItems: "center",
    paddingVertical: 14,
    marginBottom: 10,
    paddingHorizontal: 10
  },
  badgeEmoji: {
    fontSize: 26,
  },
  badgeName: {
    fontSize: FONT_SIZES.md,
    textAlign: "center",
    marginTop: 4,
    fontWeight: "900",
  },
  inactiveBadge: {
    opacity: .4
  },
  inactiveText: {
    color: "#9CA3AF",
  },
  // Progress Bar Styles
  progressBarContainer: {
    width: '100%',
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    marginTop: 8,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 6
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.buttonColor,
    borderRadius: 3,
  },
  progressText: {
    fontSize: 8,
    marginTop: 4,
    color: '#6B7280',
  },
})