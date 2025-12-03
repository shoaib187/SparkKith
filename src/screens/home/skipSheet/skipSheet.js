import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Button from '../../../components/common/button/button';

export default function SkipSheet({ selectedTask, setSkipVisible, handleSkip }) {
  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.skippedTitle}>Skip Task</Text>

      {/* Message */}
      <View style={styles.messageCard}>
        {/* <Text style={styles.messageTitle}>Oops! Cannot Undo Skip</Text> */}
        <Text style={styles.messageText}>
          Once a task is skipped, it cannot be undone. This helps maintain your progress consistency.
        </Text>

        {/* Spark Tip */}
        <View style={styles.tipContainer}>
          <Text style={styles.tipIcon}>💡</Text>
          <Text style={styles.tipText}>
            Try completing your tasks next time to earn streaks and badges!
          </Text>
        </View>
      </View>

      {/* Task Preview */}
      <View style={styles.taskPreview}>
        <Text style={styles.taskPreviewLabel}>Skipped Task:</Text>
        <Text style={styles.taskPreviewText}>
          "{selectedTask?.taskTitle || selectedTask?.title}"
        </Text>
      </View>

      {/* Action Button */}
      <Button
        title="Skip task"
        textColor="#fff"
        style={{ width: "100%" }}
        onPress={() => {
          setSkipVisible(false)
          handleSkip()
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  skippedTitle: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 20,
    marginTop: 10,
  },
  messageCard: {
    backgroundColor: '#F9FAFB',
    padding: 20,
    borderRadius: 16,
    width: '100%',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  messageTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#DC2626',
    marginBottom: 10,
    textAlign: 'center',
  },
  messageText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  tipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    padding: 12,
    borderRadius: 12,
    marginTop: 15,
    width: '100%',
  },
  tipIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  tipText: {
    fontSize: 13,
    color: '#92400E',
    flex: 1,
    lineHeight: 18,
  },
  taskPreview: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 16,
    width: '100%',
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  taskPreviewLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#9CA3AF',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  taskPreviewText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 24,
  },
});
