import React, { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, RefreshControl } from "react-native";
import StreakProgress from "../../../components/common/streakProgress/streakProgress";
import ProfileCard from "../../../components/profileCard/profileCard";
import Header from "../../../components/common/header/header";
import ProfileOverview from "../../../components/profileOverview/profileOverview";
import colors from "../../../components/constants/colors/colors";
import BadgeSection from "../../../components/badgeSection/badgeSection";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../../../redux/slices/profileSlice/profileSlice";
import ProfileSkeleton from "../../../components/skeletons/profileSkeleton/profileSkeleton";

const badgeMilestones = [
  { points: 50, badge: "hydration hero" },
  { points: 150, badge: "zen master" },
  { points: 250, badge: "sleep star" },
  { points: 350, badge: "energy booster" },
  { points: 450, badge: "streak saver" },
  { points: 550, badge: "challenge champion" },
];


export default function ProfileHomePage({ navigation }) {
  const dispatch = useDispatch();
  const { token } = useSelector(state => state.auth);
  const { profileData, loading } = useSelector(state => state.profile);
  // console.log("profileData", profileData);

  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    if (token) {
      dispatch(fetchUserProfile(token));
    }
  }, [dispatch, token]);

  // static badges list
  const badges = [
    { id: 1, emoji: require("../../../../assets/badges/badge1.png"), name: "Hydration Hero" },
    { id: 2, emoji: require("../../../../assets/badges/badge2.png"), name: "Zen Master" },
    { id: 3, emoji: require("../../../../assets/badges/badge3.png"), name: "Sleep Star" },
    { id: 4, emoji: require("../../../../assets/badges/badge4.png"), name: "Energy Booster" },
    { id: 5, emoji: require("../../../../assets/badges/badge5.png"), name: "Streak Saver" },
    { id: 6, emoji: require("../../../../assets/badges/badge6.png"), name: "Challenge Champ" },
  ];

  const getNextBadgePoints = (totalPoints) => {
    // find the next milestone where required points are greater than current points
    const nextMilestone = badgeMilestones.find(m => m.points > totalPoints);

    if (!nextMilestone) return 0; // User already has highest badge

    return nextMilestone.points - totalPoints;
  };

  const pointsToNextBadge = getNextBadgePoints(profileData?.totalPoints || 0);

  const getBadgeProgress = (totalPoints) => {
    const milestones = badgeMilestones;

    // find the index of the next milestone
    const nextIndex = milestones.findIndex(m => m.points > totalPoints);

    // if user already max badge → full progress
    if (nextIndex === -1) {
      return { progress: 100, nextBadge: null };
    }

    const nextMilestone = milestones[nextIndex];
    const prevMilestone = milestones[nextIndex - 1] || { points: 0 };

    const range = nextMilestone.points - prevMilestone.points;
    const progress = ((totalPoints - prevMilestone.points) / range) * 100;

    return {
      progress: Math.min(progress, 100),
      nextBadge: nextMilestone.badge,
    };
  };

  const { progress } = getBadgeProgress(profileData?.totalPoints || 0);



  // mark badges as active based on API response
  const updatedBadges = badges.map(badge => ({
    ...badge,
    active: profileData?.badge?.toLowerCase() === badge.name.toLowerCase(),
  }));

  const handleRefresh = async () => {
    setRefreshing(true)
    await dispatch(fetchUserProfile(token))
    setRefreshing(false)
  }


  if (loading) {
    return <ProfileSkeleton />
  }

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
        <ProfileOverview stats={profileData} />
        <StreakProgress progress={progress} title={"Next Badge"} />
        <Text style={{ color: colors.description }}>
          {pointsToNextBadge} points to your next badge
        </Text>
        <BadgeSection badges={updatedBadges} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
