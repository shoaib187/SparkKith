import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList } from "react-native";
import colors from "../../../components/constants/colors/colors";
import RankCard from "../../../components/common/rankCard/rankCard";
import CommunityStats from "../../../components/communityStats/communityStats";
import BottomSheet from "../../../components/common/bottomSheet/bottomSheet";
import PointsSheet from "../../../components/common/pointsSheet/pointsSheet";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopPerformers } from "../../../redux/slices/communitySlice/communitySlice";
import { getWeeklyCommunityRankings } from "../../../redux/slices/taskSlice/taskSlice";

export default function CommunityHomePage() {
  const [activeTab, setActiveTab] = useState("leaderboard");

  const dispatch = useDispatch()
  const { performers } = useSelector(state => state.performers)
  const { communityRanking } = useSelector(state => state.tasks)
  const { token, user } = useSelector(state => state.auth);

  console.log(token)
  console.log("communityRanking", communityRanking)
  useEffect(() => {
    if (token) {
      dispatch(fetchTopPerformers(token))
      dispatch(getWeeklyCommunityRankings(token))
    }
  }, [dispatch, token])

  // console.log(performers)
  const your = user?.email
  // console.log(your)

  const rankings = [
    { id: 1, emoji: "🌿", name: "Zen Den", points: "12,450", you: false },
    { id: 2, emoji: "🔥", name: "Glow Getters", points: "10,980", you: true },
    { id: 3, emoji: "💬", name: "Vibe Tribe", points: "9,320", you: false },
    { id: 4, emoji: "🌞", name: "Joy Squad", points: "8,740", you: false },
  ];


  const [visible, setVisible] = useState(false)
  const ranking = performers?.map((item, index) => {
    let emoji = "🌿"; // default
    switch (index) {
      case 0:
        emoji = "🥇"; // first place
        break;
      case 1:
        emoji = "🥈"; // second place
        break;
      case 2:
        emoji = "🥉"; // third place
        break;
      default:
        emoji = "🌟"; // others
    }
    return {
      ...item,
      emoji,
    };
  });


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
              data={communityRanking}
              keyExtractor={(item) => item?._id}
              renderItem={({ item }) => <RankCard item={item} onPress={() => setVisible(!visible)} />}
            />
          </>
        ) : (
          <>
            <Text style={styles.rankTitle}>Top 5 Members</Text>
            <FlatList
              data={ranking}
              keyExtractor={(item) => item?._id}
              renderItem={({ item }) => <RankCard item={item} your={your} key={item?._id} />}
            />
          </>
        )}

      </ScrollView>
      <BottomSheet visible={visible} onClose={() => setVisible(!visible)} >
        <PointsSheet selected />
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
