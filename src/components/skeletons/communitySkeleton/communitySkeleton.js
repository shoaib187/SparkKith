import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import colors from "../../../components/constants/colors/colors";

export default function CommunitySkeleton() {
  return (
    <View style={styles.container}>
      <SkeletonPlaceholder
        speed={800}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Title */}
          <SkeletonPlaceholder.Item width={120} height={20} borderRadius={4} alignSelf="center" marginBottom={20} />

          {/* Community Stats Section */}
          <SkeletonPlaceholder.Item flexDirection="row" justifyContent="space-between" marginBottom={20}>
            {[...Array(3)].map((_, index) => (
              <SkeletonPlaceholder.Item key={index} width="30%" height={110} borderRadius={12} />
            ))}
          </SkeletonPlaceholder.Item>

          {/* Tabs */}
          <SkeletonPlaceholder.Item flexDirection="row" backgroundColor="#F4E7E5" borderRadius={8} marginVertical={10}>
            <SkeletonPlaceholder.Item flex={1} height={40} borderRadius={8} marginRight={4} />
            <SkeletonPlaceholder.Item flex={1} height={40} borderRadius={8} marginLeft={4} />
          </SkeletonPlaceholder.Item>

          {/* Section Title */}
          <SkeletonPlaceholder.Item width={150} height={16} borderRadius={4} marginTop={10} marginBottom={6} />

          {/* Rank Cards */}
          {[...Array(5)].map((_, index) => (
            <SkeletonPlaceholder.Item
              key={index}
              backgroundColor="#FFFFFF"
              borderRadius={12}
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              paddingHorizontal={14}
              paddingVertical={18}
              marginVertical={6}
            >
              {/* Left Side */}
              <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
                <SkeletonPlaceholder.Item width={24} height={24} borderRadius={12} marginRight={8} />
                <SkeletonPlaceholder.Item width={20} height={20} borderRadius={10} marginRight={8} />
                <SkeletonPlaceholder.Item width={120} height={16} borderRadius={4} marginRight={8} />
                <SkeletonPlaceholder.Item width={40} height={20} borderRadius={8} />
              </SkeletonPlaceholder.Item>

              {/* Right Side */}
              <SkeletonPlaceholder.Item alignItems="flex-end">
                <SkeletonPlaceholder.Item width={30} height={12} borderRadius={4} marginBottom={2} />
                <SkeletonPlaceholder.Item width={40} height={12} borderRadius={4} />
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder.Item>
          ))}
        </ScrollView>
      </SkeletonPlaceholder>
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
});