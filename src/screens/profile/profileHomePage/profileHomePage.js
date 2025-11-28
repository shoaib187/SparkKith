// --- imports remain the same ---
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

export default function ProfileHomePage({ navigation }) {
  const dispatch = useDispatch();
  const { token } = useSelector(state => state.auth);
  const { profileData, loading } = useSelector(state => state.profile);

  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    if (token) {
      dispatch(fetchUserProfile(token));
    }
  }, [dispatch, token]);


  // -------------------------------
  // UPDATED STATIC BADGE NAMES
  // -------------------------------
  const defaultBadges = [
    { id: 1, emoji: require("../../../../assets/badges/badge1.png"), title: "Hydration Hero", name: "hydration" },
    { id: 2, emoji: require("../../../../assets/badges/badge2.png"), title: "Zen Den", name: "zen" },
    { id: 3, emoji: require("../../../../assets/badges/badge3.png"), title: "Sleep Star", name: "sleepStar" },
    { id: 4, emoji: require("../../../../assets/badges/badge4.png"), title: "Energy Booster", name: "energyBooster" },
    { id: 5, emoji: require("../../../../assets/badges/badge5.png"), title: "Streak Saver", name: "streakSaver" },
    { id: 6, emoji: require("../../../../assets/badges/badge6.png"), title: "Challenge Champion", name: "challengeChamp" },
  ];

  // user badge array from API
  const userBadges = profileData?.badges || [];

  const finalBadges = defaultBadges
    .filter(badge =>
      userBadges.some(ub => ub.name.toLowerCase() === badge.name.toLowerCase())
    )
    .map(badge => {
      const match = userBadges.find(ub => ub.name === badge.name);

      return {
        ...badge,
        progress: match.progress,
        unlocked: match.progress >= 10,
      };
    });


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
        <ProfileOverview stats={profileData} />

        {/* <StreakProgress progress={10} title={"Next Badge"} /> */}
        {/*
        <Text style={{ color: colors.description }}>
          {10} points to your next badge
        </Text> */}

        {/* UPDATED BADGES SENT TO UI */}
        <BadgeSection badges={finalBadges} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
