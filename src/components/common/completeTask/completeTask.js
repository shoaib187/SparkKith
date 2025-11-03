import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import colors from '../../constants/colors/colors';
import Button from '../button/button';

export default function CompleteTask({ onDone, onUndo }) {
  return (
    <View style={styles.taskCard}>
      {/* Emoji Section */}
      <View style={styles.leafBox}>
        <Text style={styles.leafEmoji}>🌿</Text>
      </View>
      <Text style={[styles.taskSubtitle, { marginVertical: 6 }]}>
        You skipped
      </Text>

      {/* Task Title & Description */}
      <View style={styles.taskTextContainer}>
        <Text style={styles.taskTitle}>Take 3 deep breaths</Text>
        <Text style={styles.taskSubtitle}>
          Take 3 deep breaths and let go of one worry.
        </Text>
      </View>
      {/* Buttons */}

      <Button
        title="Undo"
        textColor="#111827"
        style={{ width: "100%", backgroundColor: 'transparent' }}
        onPress={onUndo}
      />
      <Button
        title="Done"
        color={colors.buttonColor}
        textColor="#fff"
        style={{ width: '100%' }}
        onPress={onDone}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  taskCard: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  leafBox: {
    width: 70,
    height: 70,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leafEmoji: {
    fontSize: 32,
  },
  taskTextContainer: {
    alignItems: 'center',
    marginBottom: 14,
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
    lineHeight: 20,
  },
  rewardsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 18,
    gap: 14,
  },
  rewardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  rewardIcon: {
    width: 22,
    height: 22,
  },
  rewardText: {
    fontSize: 14,
    color: '#111827',
    fontWeight: '500',
  },
});
