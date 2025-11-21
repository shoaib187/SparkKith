import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export default function InsightsSkeleton() {
  return (
    <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16 }}>
      <SkeletonPlaceholder
        backgroundColor="#E1E9EE"
        highlightColor="#F2F8FC"
      >
        {/* Header */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
          <View style={{ width: 50, height: 50, borderRadius: 25 }} />
          <View style={{ marginLeft: 12 }}>
            <View style={{ width: 120, height: 12, borderRadius: 4, marginBottom: 6 }} />
            <View style={{ width: 200, height: 16, borderRadius: 4 }} />
          </View>
        </View>

        {/* Tabs */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
          <View style={{ width: 80, height: 30, borderRadius: 15 }} />
          <View style={{ width: 80, height: 30, borderRadius: 15 }} />
        </View>

        {/* Chart Skeleton */}
        <View style={{ height: 250, borderRadius: 16, marginBottom: 20 }} />


        {/* Mood Cards Skeleton */}
        {[...Array(3)].map((_, i) => (
          <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
            <View style={{ width: 50, height: 50, borderRadius: 12 }} />
            <View style={{ marginLeft: 12, flex: 1 }}>
              <View style={{ width: '70%', height: 12, borderRadius: 4, marginBottom: 6 }} />
              <View style={{ width: '50%', height: 12, borderRadius: 4 }} />
            </View>
          </View>
        ))}
      </SkeletonPlaceholder>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
