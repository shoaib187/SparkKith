import React, { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, RefreshControl } from "react-native";
import StreakProgress from "../../../components/common/streakProgress/streakProgress";
import ProfileCard from "../../../components/profileCard/profileCard";
import Header from "../../../components/common/header/header";
import ProfileOverview from "../../../components/profileOverview/profileOverview";
import BadgeSection from "../../../components/badgeSection/badgeSection";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../../../redux/slices/profileSlice/profileSlice";
import ProfileSkeleton from "../../../components/skeletons/profileSkeleton/profileSkeleton";
import colors from "../../../components/constants/colors/colors";

export default function ProfileHomePage({ navigation }) {
  const dispatch = useDispatch();
  const { token } = useSelector(state => state.auth);
  const { profileData, loading } = useSelector(state => state.profile);
  // console.log("profileData", profileData)

  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    if (token) {
      dispatch(fetchUserProfile(token));
    }
  }, [dispatch, token]);


  // -------------------------------
  // UPDATED BADGES LOGIC
  // -------------------------------

  const defaultBadges = [
    { id: 1, emoji: require("../../../../assets/badges/badge1.png"), title: "Hydration Hero", name: "hydration" },
    { id: 2, emoji: require("../../../../assets/badges/badge2.png"), title: "Zen Den", name: "zen" },
    { id: 3, emoji: require("../../../../assets/badges/badge3.png"), title: "Sleep Star", name: "sleepStar" },
    { id: 4, emoji: require("../../../../assets/badges/badge4.png"), title: "Energy Booster", name: "energyBooster" },
    { id: 5, emoji: require("../../../../assets/badges/badge5.png"), title: "Streak Saver", name: "streakSaver" },
    { id: 6, emoji: require("../../../../assets/badges/badge6.png"), title: "Challenge Champion", name: "challengeChamp" },
  ];

  // User badge array from API
  const userBadges = profileData?.badges || [];

  // Logic for merging badges
  const getFinalBadges = () => {
    // If no badges from backend, show all default badges as locked
    if (!userBadges || userBadges.length === 0) {
      return defaultBadges.map(badge => ({
        ...badge,
        progress: 0,
        unlocked: false
      }));
    }

    // If badges from backend, merge with default badges
    return defaultBadges.map(defaultBadge => {
      // Find matching badge from user badges
      const userBadge = userBadges.find(ub =>
        ub.name.toLowerCase() === defaultBadge.name.toLowerCase()
      );

      if (userBadge) {
        // If user has this badge, use backend data
        return {
          ...defaultBadge,
          progress: userBadge.progress || 0,
          unlocked: userBadge.unlocked || false
        };
      } else {
        // If user doesn't have this badge, show as locked
        return {
          ...defaultBadge,
          progress: 0,
          unlocked: false
        };
      }
    });
  };

  const finalBadges = getFinalBadges();
  const unlockedBadgesCount = finalBadges.filter(badge => badge.unlocked).length;

  // -------------------------------
  // SIMPLIFIED BADGE CALCULATION
  // -------------------------------

  const calculateNextBadgeProgress = () => {
    // Get all locked badges (not yet unlocked)
    const lockedBadges = finalBadges.filter(badge => !badge.unlocked);

    // If all badges are unlocked, show completion message
    if (lockedBadges.length === 0) {
      return {
        progress: 100,
        pointsNeeded: 0,
        badgeTitle: "All badges unlocked! 🎉",
        multipleSameProgress: false
      };
    }

    // Find the highest progress among locked badges
    const highestProgress = Math.max(...lockedBadges.map(badge => badge.progress));

    // Find all badges with this highest progress
    const badgesWithHighestProgress = lockedBadges.filter(badge => badge.progress === highestProgress);

    // Calculate points needed to reach next level (assuming 10 points needed total)
    const pointsNeeded = 10 - highestProgress;

    // If multiple badges have same highest progress
    if (badgesWithHighestProgress.length > 1) {
      const badgeNames = badgesWithHighestProgress.map(badge => badge.title).join(", ");
      return {
        progress: highestProgress,
        pointsNeeded: pointsNeeded,
        badgeTitle: `Multiple badges (${badgeNames})`,
        multipleSameProgress: true
      };
    } else {
      // Single badge with highest progress
      const nextBadge = badgesWithHighestProgress[0];
      return {
        progress: highestProgress,
        pointsNeeded: pointsNeeded,
        badgeTitle: nextBadge.title,
        multipleSameProgress: false
      };
    }
  };

  const nextBadgeInfo = calculateNextBadgeProgress();



  // refresh function
  const handleRefresh = async () => {
    setRefreshing(true);
    await dispatch(fetchUserProfile(token));
    setRefreshing(false);
  };

  if (loading) return <ProfileSkeleton />;

  return (
    <View style={styles.container}>
      <Header
        title={"Profile"}
        showBack={false}
        onSettingPress={() => navigation.navigate("Settings")}
        showSettings
      />

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16 }}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
      >
        <ProfileCard userInfo={profileData} />
        <ProfileOverview unlockedBadgesCount={unlockedBadgesCount} stats={profileData} />

        <StreakProgress progress={nextBadgeInfo.progress * 10} title={"Next Badge"} />
        <Text style={{ color: colors.description, marginBottom: 8 }}>
          {nextBadgeInfo.pointsNeeded > 0
            ? `${nextBadgeInfo.pointsNeeded + "0"} points to your next badge`
            : "Congratulations! All badges unlocked! 🎉"
          }
        </Text>
        {nextBadgeInfo.multipleSameProgress && (
          <Text style={[styles.multipleBadgesText, { color: colors.description }]}>
            Multiple badges at same progress: {nextBadgeInfo.badgeTitle}
          </Text>
        )}
        {!nextBadgeInfo.multipleSameProgress && nextBadgeInfo.pointsNeeded > 0 && (
          <Text style={[styles.nextBadgeText, { color: colors.description }]}>
            Next: {nextBadgeInfo.badgeTitle}
          </Text>
        )}
        <BadgeSection badges={finalBadges} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  multipleBadgesText: {
    fontSize: 12,
    fontStyle: 'italic',
    marginBottom: 8,
  },
  nextBadgeText: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 16,
  },
});
