import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import StreakProgress from "../../../components/common/streakProgress/streakProgress";
import ProfileCard from "../../../components/profileCard/profileCard";
import Header from "../../../components/common/header/header";
import ProfileOverview from "../../../components/profileOverview/profileOverview";
import colors from "../../../components/constants/colors/colors";
import BadgeSection from "../../../components/badgeSection/badgeSection";

export default function ProfileHomePage({ navigation }) {
  const badges = [
    { id: 1, emoji: require("../../../../assets/badges/badge1.png"), name: "Hydration Hero", active: true },
    { id: 2, emoji: require("../../../../assets/badges/badge2.png"), name: "Zen Master", active: true },
    { id: 3, emoji: require("../../../../assets/badges/badge3.png"), name: "Sleep Star", active: false },
    { id: 4, emoji: require("../../../../assets/badges/badge4.png"), name: "Energy Booster", active: false },
    { id: 5, emoji: require("../../../../assets/badges/badge5.png"), name: "Streak Saver", active: false },
    { id: 6, emoji: require("../../../../assets/badges/badge6.png"), name: "Challenge Champ", active: false },
  ];

  return (
    <View style={styles.container}>
      <Header title={"Profile"} onSettingPress={() => navigation.navigate("Settings")} showSettings />
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16 }} showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <ProfileCard />
        {/* Overview */}
        <ProfileOverview />
        {/* Next Badge */}
        <StreakProgress title={"Next Badge"} />
        <Text style={{ color: colors.description }}>90 points to your next badge</Text>

        {/* Badge Gallery */}
        <BadgeSection badges={badges} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
