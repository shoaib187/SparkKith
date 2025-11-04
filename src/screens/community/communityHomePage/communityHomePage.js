import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList } from "react-native";
import colors from "../../../components/constants/colors/colors";
import RankCard from "../../../components/common/rankCard/rankCard";
import CommunityStats from "../../../components/communityStats/communityStats";
import BottomSheet from "../../../components/common/bottomSheet/bottomSheet";
import PointsSheet from "../../../components/common/pointsSheet/pointsSheet";

export default function CommunityHomePage() {
  const [activeTab, setActiveTab] = useState("leaderboard");

  const rankings = [
    { id: 1, emoji: "🌿", name: "Zen Den", points: "12,450", you: false },
    { id: 2, emoji: "🔥", name: "Glow Getters", points: "10,980", you: true },
    { id: 3, emoji: "💬", name: "Vibe Tribe", points: "9,320", you: false },
    { id: 4, emoji: "🌞", name: "Joy Squad", points: "8,740", you: false },
  ];

  const members = [
    { id: 1, name: "Shoaib", streak: "10 days", points: "12,450 Pts", emoji: "👑" },
    { id: 2, name: "Ahsan", streak: "9 days", points: "10,980 Pts", emoji: "🔥" },
    { id: 3, name: "Sara", streak: "8 days", points: "9,320 Pts", emoji: "💬" },
    { id: 4, name: "Ali", streak: "7 days", points: "8,740 Pts", emoji: "🌞" },
  ];


  const [visible, setVisible] = useState(false)

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Community</Text>

        {/* Community Stats Section */}
        <CommunityStats />

        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "leaderboard" && styles.activeTab]}
            onPress={() => setActiveTab("leaderboard")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "leaderboard" && styles.activeTabText,
              ]}
            >
              Leaderboard
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === "members" && styles.activeTab]}
            onPress={() => setActiveTab("members")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "members" && styles.activeTabText,
              ]}
            >
              Members
            </Text>
          </TouchableOpacity>
        </View>

        {/* Conditional Section */}
        {activeTab === "leaderboard" ? (
          <>
            <Text style={styles.rankTitle}>This Week's Rankings</Text>
            <FlatList
              data={rankings}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <RankCard item={item} onPress={() => setVisible(!visible)} />}
            />
          </>
        ) : (
          <>
            <Text style={styles.rankTitle}>Top 5 Members</Text>
            {members.map((m) => (
              <RankCard item={m} onPress={() => setVisible(!visible)} />
            ))}
          </>
        )}

      </ScrollView>
      <BottomSheet visible={!visible} onClose={() => setVisible(!visible)} >
        <PointsSheet />
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    textAlign: "center",
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#F4E7E5",
    borderRadius: 8,
    marginVertical: 10,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: "#FCA5A5",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
  },
  activeTabText: {
    color: "#FFFFFF",
  },
  rankTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
    marginTop: 10,
    marginBottom: 6,
  },
  memberCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    marginBottom: 8,
  },
  memberEmoji: {
    fontSize: 24,
    marginRight: 10,
  },
  memberInfo: {
    flexDirection: "column",
  },
  memberName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
  },
  memberRole: {
    fontSize: 13,
    color: "#6B7280",
  },
});
