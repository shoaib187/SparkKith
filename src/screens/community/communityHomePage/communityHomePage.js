import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList, ActivityIndicator } from "react-native";
import colors from "../../../components/constants/colors/colors";
import RankCard from "../../../components/common/rankCard/rankCard";
import CommunityStats from "../../../components/communityStats/communityStats";
import BottomSheet from "../../../components/common/bottomSheet/bottomSheet";
import PointsSheet from "../../../components/common/pointsSheet/pointsSheet";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopPerformers } from "../../../redux/slices/communitySlice/communitySlice";
import { getWeeklyCommunityRankings } from "../../../redux/slices/taskSlice/taskSlice";
import CommunitySkeleton from "../../../components/skeletons/communitySkeleton/communitySkeleton";
import CommunityRankCard from "../../../components/common/communityRankCard/communityRankCard";

export default function CommunityHomePage() {
  const [activeTab, setActiveTab] = useState("leaderboard");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);

  const dispatch = useDispatch();
  const { performers, loading: performersLoading } = useSelector(state => state.performers);
  const { communityRanking, loading: rankingLoading } = useSelector(state => state.tasks);
  const { token, user } = useSelector(state => state.auth);
  const { profileData } = useSelector((state) => state.profile);
  // console.log("profileData", profileData)
  // console.log("communityRanking", performers)

  const yourEmail = user?.email;

  useEffect(() => {
    if (token) {
      dispatch(fetchTopPerformers(token));
      dispatch(getWeeklyCommunityRankings(token));
    }
  }, [dispatch, token]);

  // Prepare top performers with emojis
  const rankingData = performers?.map((item, index) => {
    const emojis = ["🥇", "🥈", "🥉"];
    return { ...item, emoji: emojis[index] || "🌟" };
  });

  if (rankingLoading || performersLoading) {
    return <CommunitySkeleton />
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Community</Text>

        {/* Community Stats Section */}
        <CommunityStats stats={profileData} />

        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "leaderboard" && styles.activeTab]}
            onPress={() => setActiveTab("leaderboard")}
          >
            <Text style={[styles.tabText, activeTab === "leaderboard" && styles.activeTabText]}>
              Leaderboard
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === "members" && styles.activeTab]}
            onPress={() => setActiveTab("members")}
          >
            <Text style={[styles.tabText, activeTab === "members" && styles.activeTabText]}>
              Members
            </Text>
          </TouchableOpacity>
        </View>

        {/* Conditional Sections */}
        {activeTab === "leaderboard" ? (
          <>
            <Text style={styles.rankTitle}>This Week's Rankings</Text>
            {rankingLoading ? (
              <ActivityIndicator size="small" color={colors.buttonColor} style={styles.loader} />
            ) : (
              <FlatList
                data={communityRanking}
                keyExtractor={(item) => item?._id}
                renderItem={({ item }) => <CommunityRankCard item={item} onPress={() => {
                  setSelected(item)
                  setVisible(true)
                }} />}
              />
            )}
          </>
        ) : (
          <>
            <Text style={styles.rankTitle}>Top 5 Members</Text>
            {performersLoading ? (
              <ActivityIndicator size="small" color={colors.buttonColor} style={styles.loader} />
            ) : (
              <FlatList
                data={rankingData}
                keyExtractor={(item) => item?._id}
                renderItem={({ item }) => <RankCard item={item} your={yourEmail} />}
              />
            )}
          </>
        )}
      </ScrollView>

      {/* Bottom Sheet for Points */}
      <BottomSheet visible={visible} onClose={() => setVisible(false)}>
        <PointsSheet selected={selected} />
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
  loader: {
    marginVertical: 10,
  },
});

