import { View, Text, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native';
import React from 'react';
import colors from '../../constants/colors/colors';
import Button from '../button/button';

export default function TaskCard({ task, onDone, onSkip, onPress, selectedTask, loading }) {
  // console.log(task)
  if (!task) return null;

  return (
    <View style={styles.taskCard}>

      {/* Emoji */}
      <View style={styles.leafBox}>
        <Text style={styles.leafEmoji}>🌿</Text>
      </View>

      {/* Title & Description */}
      <View style={styles.taskTitleWrap}>
        <Text numberOfLines={2} style={styles.taskTitle}>{task?.title}</Text>
        <Text numberOfLines={2} style={styles.taskSubtitle}>{task?.desc}</Text>
      </View>

      {/* Rewards */}
      <View style={styles.taskReward}>
        <TouchableOpacity onPress={onPress} style={styles.rewardItem}>
          <Image
            source={require('../../../../assets/icons/star.png')}
            style={styles.rewardIcon}
          />
          <Text style={styles.rewardNumber}>+{task.points || 10} points</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onPress} style={styles.rewardItem}>
          <Image
            source={require('../../../../assets/icons/fire.png')}
            style={styles.rewardIcon}
          />
          <Text style={styles.rewardLabel}>1 day streak</Text>
        </TouchableOpacity>
      </View>

      {/* Buttons */}
      <View style={styles.taskFooterRow}>
        <Button title='Done' onPress={onDone} disabled={loading} style={{ width: '40%' }} />
        <Button title='SKIP' onPress={onSkip} disabled={loading} style={{ width: '40%', backgroundColor: 'transparent', borderWidth: 1, borderColor: '#ddd' }} textStyle={{ color: "#444" }} />
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
  },
  leafBox: {
    width: 70,
    height: 70,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  leafEmoji: { fontSize: 28 },
  taskTitleWrap: { alignItems: 'center', marginBottom: 12 },
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
    gap: 4,
  },
  rewardIcon: { width: 24, height: 24 },
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
  doneText: { fontWeight: '700', color: '#fff', fontSize: 14 },
  skipButton: {
    paddingVertical: 10,
    paddingHorizontal: 36,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  skipText: { color: '#6B7280', fontWeight: '600', fontSize: 14 },
});
