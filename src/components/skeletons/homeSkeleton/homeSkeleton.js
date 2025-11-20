import { View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

export default function HomeSkeleton() {
  return (
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item>
        <View style={{ paddingHorizontal: 16, paddingTop: 20 }}>
          {/* Header: Avatar + Greeting */}
          <SkeletonPlaceholder.Item flexDirection="row" alignItems="center" marginBottom={20}>
            <SkeletonPlaceholder.Item width={50} height={50} borderRadius={25} />
            <SkeletonPlaceholder.Item marginLeft={12}>
              <SkeletonPlaceholder.Item width={120} height={14} borderRadius={4} marginBottom={6} />
              <SkeletonPlaceholder.Item width={200} height={18} borderRadius={4} />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder.Item>

          {/* Stats Section */}
          <SkeletonPlaceholder.Item flexDirection="row" justifyContent="space-between" marginBottom={16}>
            {[...Array(3)].map((_, index) => (
              <SkeletonPlaceholder.Item key={index} width="30%" height={120} borderRadius={12} />
            ))}
          </SkeletonPlaceholder.Item>

          {/* Streak Progress */}
          <SkeletonPlaceholder.Item height={24} borderRadius={12} width="100%" marginBottom={16} />

          {/* Task Card */}
          <SkeletonPlaceholder.Item height={250} borderRadius={16} marginBottom={16} />

          {/* Quotes / Mood Section */}
          <SkeletonPlaceholder.Item height={80} borderRadius={12} marginBottom={16} />
          <SkeletonPlaceholder.Item height={80} borderRadius={12} marginBottom={16} />
        </View>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
}