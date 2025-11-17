import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { FONT_SIZES } from '../constants/sizes/responsiveFont'
import colors from '../constants/colors/colors'

export default function ProfileOverview({ stats }) {
  const badgeMilestones = [{ points: 50, badge: "hydration hero" }, { points: 150, badge: "zen master" }, { points: 250, badge: "sleep star" }, { points: 350, badge: "energy booster" }, { points: 450, badge: "streak saver" }, { points: 550, badge: "challenge champion" }];
  const getAchievementsCount = (points) => {
    return badgeMilestones.filter(m => points >= m.points).length;
  };

  const achievements = getAchievementsCount(stats?.totalPoints || 0);


  return (
    <View>
      <Text style={styles.sectionTitle}>Overview</Text>
      <View style={styles.overviewContainer}>
        <View style={styles.streakCard}>
          <Image source={require("../../../assets/icons/fire.png")} style={{ width: 26, height: 26 }} />
          <View>
            <Text style={styles.boldText}>3 day streak</Text>
            <Text style={styles.smallText}>Longest self-care streak ever!</Text>
          </View>
        </View>

        <View style={styles.rowCards}>
          <View style={styles.smallCard}>
            <Image source={require("../../../assets/icons/star.png")} style={{ width: 26, height: 26 }} />
            <View>
              <Text style={styles.boldText}>{stats?.totalPoints}</Text>
              <Text style={styles.smallText}>Total Points</Text>
            </View>
          </View>

          <View style={styles.smallCard}>
            <Image source={require("../../../assets/icons/trophy.png")} style={{ width: 26, height: 26 }} />
            <View>
              <Text style={styles.boldText}>{achievements}</Text>
              <Text style={styles.smallText}>Achievements</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: FONT_SIZES.lg * .9,
    fontWeight: "900",
    color: "#111827",
    marginBottom: 6,
  },
  overviewContainer: {
    borderRadius: 12,
  },
  streakCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    gap: 10
  },
  emoji: {
    fontSize: 22,
    marginRight: 10,
  },
  boldText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  smallText: {
    color: colors.description,
    fontSize: 12,
  },
  rowCards: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8
  },
  smallCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingVertical: 18,
    alignItems: "center",
    flexDirection: 'row',
    padding: 16,
    gap: 8
  },
})