import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../constants/colors/colors';
import Button from '../button/button';

export default function CompleteTask({ onDone, onUndo, handleSkip, selectedTask, setVisible }) {
  if (!selectedTask) return null;

  const isCompleted = selectedTask.completed;
  const isSkipped = selectedTask.skipped;

  // Handle skipped tasks - show special message
  if (isSkipped) {
    return (
      <View style={styles.container}>
        {/* Title */}
        <Text style={styles.skippedTitle}>Task Skipped</Text>

        {/* Message */}
        <View style={styles.messageCard}>
          <Text style={styles.messageTitle}>Oops! Cannot Undo Skip</Text>
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
          title="Got It"
          textColor="#fff"
          style={{ width: "100%" }}
          onPress={() => setVisible(false)}
        />
      </View>
    );
  }

  // Handle completed tasks
  if (isCompleted) {
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
          title="Undo Completion"
          textColor="#fff"
          style={styles.undoButton}
          onPress={onUndo}
        />
      </View>
    );
  }

  // Handle pending tasks - confirmation to complete
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

      {/* Action Buttons */}
      <View style={styles.buttonRow}>
        <Button
          title="Skip"
          textColor="#6B7280"
          style={styles.cancelButton}
          onPress={handleSkip} // This will close the modal
        />
        <Button
          title="Mark as Done"
          textColor="#fff"
          style={styles.doneButton}
          onPress={onDone}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Skipped State
  skippedIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#F59E0B',
  },
  skippedIcon: {
    fontSize: 40,
  },
  skippedTitle: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 20,
    marginTop: 10
  },
  // Completed State
  completedIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#D1FAE5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#10B981',
  },
  completedIcon: {
    fontSize: 40,
  },
  completedTitle: {
    fontSize: 24,
    fontWeight: '800',
    // color: '#065F46',
    marginBottom: 20,
  },
  // Pending State
  pendingIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#DBEAFE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#3B82F6',
  },
  pendingIcon: {
    fontSize: 40,
  },
  pendingTitle: {
    fontSize: 24,
    fontWeight: '800',
    // color: '#1E40AF',
    marginBottom: 20,
  },
  // Message Card
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
  celebrationMessage: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.buttonColor,
    marginBottom: 10,
    textAlign: 'center',
  },
  confirmationMessage: {
    fontSize: 18,
    fontWeight: '700',
    // color: '#1E40AF',
    marginBottom: 10,
    textAlign: 'center',
  },
  messageText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  // Tip Container
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
  // Task Preview
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
  // Buttons
  gotItButton: {
    width: '100%',
    backgroundColor: '#F59E0B',
    paddingVertical: 14,
    borderRadius: 12,
  },
  undoButton: {
    width: '100%',
    backgroundColor: colors.buttonColor,
    paddingVertical: 14,
    borderRadius: 12,
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