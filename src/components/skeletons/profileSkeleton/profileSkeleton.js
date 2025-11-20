import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";


export default function ProfileSkeleton() {
  return (
    <View style={styles.container}>
      <SkeletonPlaceholder speed={800}
      >
        <View style={styles.header}>
          <SkeletonPlaceholder.Item width={80} height={20} borderRadius={4} />
          <SkeletonPlaceholder.Item width={24} height={24} borderRadius={12} />
        </View>

        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 16 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Profile Card */}
          <SkeletonPlaceholder.Item
            alignItems="center"
            backgroundColor="#FFFFFF"
            borderRadius={12}
            paddingVertical={20}
            marginBottom={16}
          >
            <SkeletonPlaceholder.Item width={140} height={140} borderRadius={70} />
            <SkeletonPlaceholder.Item width={160} height={20} borderRadius={4} marginTop={12} />
            <SkeletonPlaceholder.Item width={200} height={14} borderRadius={4} marginTop={4} />
            <SkeletonPlaceholder.Item width={180} height={14} borderRadius={4} marginTop={8} />
          </SkeletonPlaceholder.Item>

          {/* Profile Overview */}
          <SkeletonPlaceholder.Item marginBottom={16}>
            <SkeletonPlaceholder.Item width={100} height={18} borderRadius={4} marginBottom={6} />

            {/* Streak Card */}
            <SkeletonPlaceholder.Item
              flexDirection="row"
              alignItems="center"
              // backgroundColor={colors.white}
              padding={12}
              borderRadius={10}
              marginBottom={10}
            >
              <SkeletonPlaceholder.Item width={26} height={26} borderRadius={13} marginRight={10} />
              <SkeletonPlaceholder.Item>
                <SkeletonPlaceholder.Item width={100} height={14} borderRadius={4} marginBottom={4} />
                <SkeletonPlaceholder.Item width={140} height={12} borderRadius={4} />
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder.Item>

            {/* Small Cards Row */}
            <SkeletonPlaceholder.Item flexDirection="row" justifyContent="space-between" gap={8}>
              {[...Array(2)].map((_, index) => (
                <SkeletonPlaceholder.Item
                  key={index}
                  flex={1}
                  // backgroundColor={colors.white}
                  borderRadius={10}
                  padding={16}
                  flexDirection="row"
                  alignItems="center"
                >
                  <SkeletonPlaceholder.Item width={26} height={26} borderRadius={13} marginRight={8} />
                  <SkeletonPlaceholder.Item>
                    <SkeletonPlaceholder.Item width={60} height={14} borderRadius={4} marginBottom={4} />
                    <SkeletonPlaceholder.Item width={80} height={12} borderRadius={4} />
                  </SkeletonPlaceholder.Item>
                </SkeletonPlaceholder.Item>
              ))}
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder.Item>

          {/* Streak Progress */}
          <SkeletonPlaceholder.Item marginTop={14} marginBottom={8}>
            <SkeletonPlaceholder.Item width={120} height={18} borderRadius={4} marginBottom={12} />
            <SkeletonPlaceholder.Item
              height={24}
              backgroundColor="#fff"
              borderRadius={12}
              marginBottom={4}
            />
            <SkeletonPlaceholder.Item width={180} height={14} borderRadius={4} />
          </SkeletonPlaceholder.Item>

          {/* Badge Section */}
          <SkeletonPlaceholder.Item marginTop={18}>
            <SkeletonPlaceholder.Item width={140} height={18} borderRadius={4} marginBottom={16} />

            {/* Badge Grid */}
            <SkeletonPlaceholder.Item
              flexDirection="row"
              flexWrap="wrap"
              justifyContent="space-between"
            >
              {[...Array(6)].map((_, index) => (
                <SkeletonPlaceholder.Item
                  key={index}
                  backgroundColor="#FFF"
                  width="30%"
                  borderRadius={12}
                  alignItems="center"
                  paddingVertical={14}
                  marginBottom={10}
                  paddingHorizontal={10}
                >
                  <SkeletonPlaceholder.Item width={70} height={70} borderRadius={5} />
                  <SkeletonPlaceholder.Item width={"30%"} height={14} borderRadius={4} marginTop={4} />
                </SkeletonPlaceholder.Item>
              ))}
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder.Item>
        </ScrollView>
      </SkeletonPlaceholder>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
});