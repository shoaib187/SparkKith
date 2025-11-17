import React, { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import StreakProgress from "../../../components/common/streakProgress/streakProgress";
import ProfileCard from "../../../components/profileCard/profileCard";
import Header from "../../../components/common/header/header";
import ProfileOverview from "../../../components/profileOverview/profileOverview";
import colors from "../../../components/constants/colors/colors";
import BadgeSection from "../../../components/badgeSection/badgeSection";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../../../redux/slices/profileSlice/profileSlice";

export default function ProfileHomePage({ navigation }) {
  const dispatch = useDispatch();
  const { token } = useSelector(state => state.auth);
  const { profileData } = useSelector(state => state.profile);
  // console.log("profileData", profileData)
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

  // mark badges as active based on API response
  const updatedBadges = badges.map(badge => ({
    ...badge,
    active: profileData?.badge?.toLowerCase() === badge.name.toLowerCase(),
  }));

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
      >
        <ProfileCard userInfo={profileData} />
        <ProfileOverview stats={profileData} />
        <StreakProgress title={"Next Badge"} />
        <Text style={{ color: colors.description }}>
          90 points to your next badge
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
