import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Button from '../../../components/common/button/button'
import colors from '../../../components/constants/colors/colors';

export default function ConfirmCompleteTask({ selectedTask, onDone, loading }) {
  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.pendingTitle}>Ready to Complete?</Text>

      {/* Confirmation Message */}
      <View style={styles.messageCard}>
        <Text style={styles.confirmationMessage}>
          Are you sure you want to mark this task as completed?
        </Text>
        <Text style={styles.messageText}>
          Once marked as done, you can always undo it if needed.
        </Text>
      </View>

      {/* Task Preview */}
      <View style={styles.taskPreview}>
        <Text style={styles.taskPreviewLabel}>Task:</Text>
        <Text style={styles.taskPreviewText}>
          "{selectedTask?.taskTitle || selectedTask?.title}"
        </Text>
        <Text style={styles.taskDescription}>
          {selectedTask?.taskDesc || selectedTask?.desc}
        </Text>
      </View>

      <View style={styles.buttonRow}>
        <Button
          title={loading ? "Marking..." : "Mark as Done"}
          textColor="#fff"
          style={styles.doneButton}
          onPress={onDone}
        />
      </View>
    </View>
  )
}



const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pendingTitle: {
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
  confirmationMessage: {
    fontSize: 18,
    fontWeight: '700',
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
  taskDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 20,
  },
  doneButton: {
    flex: 1,
    backgroundColor: colors.buttonColor,
    paddingVertical: 14,
    borderRadius: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingVertical: 14,
    borderRadius: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    width: '100%',
    gap: 12,
  },
});
