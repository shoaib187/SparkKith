import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React from 'react';
import { colors } from '../../constants/colors/colors';

export default function TaskCard() {
  return (
    <View style={styles.taskCard}>
      {/* Emoji */}
      <View style={styles.leafBox}>
        <Text style={styles.leafEmoji}>🌿</Text>
      </View>

      {/* Title & Description */}
      <View style={styles.taskTitleWrap}>
        <Text style={styles.taskTitle}>Take 3 deep breaths</Text>
        <Text style={styles.taskSubtitle}>
          Take 3 deep breaths and let go of one worry.
        </Text>
      </View>

      {/* Rewards */}
      <View style={styles.taskReward}>
        <View style={styles.rewardItem}>
          <Image
            source={require('../../../../assets/icons/star.png')}
            style={styles.rewardIcon}
          />
          <Text style={styles.rewardNumber}>+10 points</Text>
        </View>
        <View style={styles.rewardItem}>
          <Image
            source={require('../../../../assets/icons/fire.png')}
            style={styles.rewardIcon}
          />
          <Text style={styles.rewardLabel}>1 day streak</Text>
        </View>
      </View>

      {/* Buttons */}
      <View style={styles.taskFooterRow}>
        <TouchableOpacity style={styles.doneButton} activeOpacity={0.8}>
          <Text style={styles.doneText}>DONE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.skipButton} activeOpacity={0.8}>
          <Text style={styles.skipText}>SKIP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  taskCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.qoutesCard,
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  leafBox: {
    width: 70,
    height: 70,
    // borderWidth: 1,
    // borderColor: '#D1FAE5',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#ECFDF5',
    marginBottom: 16,
  },
  leafEmoji: {
    fontSize: 28,
  },
  taskTitleWrap: {
    alignItems: 'center',
    marginBottom: 12,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
  },
  taskSubtitle: {
    fontSize: 14,
    color: colors.description,
    textAlign: 'center',
    marginTop: 6,
  },
  taskReward: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16,
  },
  rewardItem: {
    alignItems: 'center',
    marginHorizontal: 6,
    flexDirection: 'row',
    gap: 4
  },
  rewardIcon: {
    width: 24,
    height: 24,
    marginBottom: 4,
  },
  taskFooterRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    gap: 16,
  },
  doneButton: {
    backgroundColor: '#FFBF00',
    paddingVertical: 10,
    paddingHorizontal: 36,
    borderRadius: 10,
  },
  doneText: {
    fontWeight: '700',
    color: '#111827',
    fontSize: 14,
  },
  skipButton: {
    paddingVertical: 10,
    paddingHorizontal: 36,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  skipText: {
    color: '#6B7280',
    fontWeight: '600',
    fontSize: 14,
  },
});
