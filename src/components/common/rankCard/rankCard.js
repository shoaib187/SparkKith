import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import colors from '../../constants/colors/colors';

export default function RankCard({ item, onPress, your }) {
  // console.log(item)
  return (
    <TouchableOpacity
      key={item._id}
      style={styles.rankCard}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <View>
        <View style={styles.rankLeft}>
          <Text style={styles.emoji}>{item?.emoji}</Text>
          <Text style={styles.rankName}>{item?.name}</Text>

          {item?.email === your && (
            <View style={styles.youTag}>
              <Text style={styles.youText}>You</Text>
            </View>
          )}
        </View>

        {item?.streak && (
          <View style={styles.streakContainer}>
            <Image
              source={require('../../../../assets/icons/fire.png')}
              style={styles.icon}
            />
            <Text style={styles.streak}>{item?.streak}{item?.streak > 1 ? " days" : " day"}</Text>
          </View>
        )}
      </View>

      <View style={styles.rankRight}>
        <Text style={styles.rankPoints}>{item?.totalPoints}</Text>
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
  emoji: {
    fontSize: 20,
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
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  streak: {
    color: colors.description,
    fontSize: 12,
    marginLeft: 4,
  },
  icon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
});
