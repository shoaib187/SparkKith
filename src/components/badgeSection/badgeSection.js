import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { FONT_SIZES } from '../constants/sizes/responsiveFont'

export default function BadgeSection({ badges }) {
  return (
    <View style={styles.badgeWrapper}>
      <Text style={styles.sectionTitle}>Badge Gallery</Text>
      <View style={styles.badgeGrid}>
        {badges.map((badge) => (
          <View
            key={badge.id}
            style={[
              styles.badgeCard,
              !badge.active && styles.inactiveBadge,
            ]}
          >
            <Image source={badge.emoji} style={{ width: 70, height: 70 }} />
            <Text
              style={[
                styles.badgeName,
                !badge.active && styles.inactiveText,
              ]}
            >
              {badge.name}
            </Text>
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
})