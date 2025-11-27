import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import colors from '../../constants/colors/colors';

export default function CommunityRankCard({ item, onPress, your }) {

  return (
    <TouchableOpacity
      key={item._id}
      style={styles.rankCard}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <View>
        <View style={styles.rankLeft}>
          <Image source={{ uri: item?.imageUrl }} style={{ width: 34, height: 34, marginRight: 4, resizeMode: 'contain' }} />
          <Text style={styles.rankName}>{item?.name || ""}</Text>

          {(item?.isUserSpark) && (
            <View style={styles.youTag}>
              <Text style={styles.youText}>You</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.rankRight}>
        <Text style={styles.rankPoints}>{item?.totalPoints || 0}</Text>
        <Text style={styles.rankPoint}>Pts</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  rankCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 18,
    marginVertical: 6,
  },
  rankLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rankRight: {
    alignItems: 'flex-end',
  },
  rankName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
    marginLeft: 6,
  },
  rankPoints: {
    fontSize: 12,
    color: colors.red,
  },
  rankPoint: {
    color: colors.description,
    fontSize: 12,
  },
  youTag: {
    backgroundColor: '#FEE2E2',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 6,
  },
  youText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#EF4444',
  },
});
