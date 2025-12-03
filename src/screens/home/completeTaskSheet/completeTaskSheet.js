import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Button from '../../../components/common/button/button'
import colors from '../../../components/constants/colors/colors';

export default function CompleteTaskSheet({ selectedTask, onUndo, loading }) {
  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.completedTitle}>Task Completed!</Text>

      {/* Celebration Message */}
      <View style={styles.messageCard}>
        <Text style={styles.celebrationMessage}>
          Great job completing your task! 🎊
        </Text>
        <Text style={styles.messageText}>
          You've made progress on your wellness journey. Keep up the momentum!
        </Text>
      </View>

      {/* Task Preview */}
      <View style={styles.taskPreview}>
        <Text style={styles.taskPreviewLabel}>Completed Task:</Text>
        <Text style={styles.taskPreviewText}>
          "{selectedTask?.taskTitle || selectedTask?.title}"
        </Text>
      </View>

      {/* Action Button */}
      <Button
        title={loading ? "Reverting..." : "Undo Completion"}
        textColor="#fff"
        style={styles.undoButton}
        onPress={onUndo}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  completedTitle: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 20,
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
  celebrationMessage: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.buttonColor,
    marginBottom: 10,
    textAlign: 'center',
  },
  messageText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
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
  undoButton: {
    width: '100%',
    backgroundColor: colors.buttonColor,
    paddingVertical: 14,
    borderRadius: 12,
  },
});
