import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../constants/colors/colors';
import Button from '../button/button';

export default function CompleteTask({ onDone, onUndo, selectedTask }) {
  if (!selectedTask) return null;
  // console.log("isDone", selectedTask)
  return (
    <View style={styles.taskCard}>
      {/* Emoji Section */}
      <View style={styles.leafBox}>
        <Text style={styles.leafEmoji}>🌿</Text>
      </View>

      {/* Optional skipped or done label */}
      <Text style={[styles.taskSubtitle, { marginVertical: 6 }]}>
        {selectedTask.done ? "Task Completed" : "Not yet completed!"}
      </Text>

      {/* Task Title & Description */}
      <View style={styles.taskTextContainer}>
        <Text style={styles.taskTitle}>{selectedTask.title}</Text>
        <Text style={styles.taskSubtitle}>{selectedTask.description}</Text>
      </View>

      {/* Buttons */}
      <Button
        title="Undo"
        textColor={selectedTask.completed ? "#fff" : "#111827"}
        style={{
          width: "100%",
          backgroundColor: selectedTask.completed ? colors.buttonColor : "transparent",
          opacity: selectedTask.completed ? 1 : 0.4,
        }}
        onPress={onUndo}
        disabled={!selectedTask.completed}
      />

      <Button
        title="Done"
        textColor={!selectedTask.completed ? "#fff" : "#111827"}
        style={{
          width: "100%",
          backgroundColor: !selectedTask.completed ? colors.buttonColor : "transparent",
          opacity: !selectedTask.completed ? 1 : 0.4,
        }}
        onPress={onDone}
        disabled={selectedTask.completed}
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
    // backgroundColor: '#E0F7FA',
  },
  leafEmoji: {
    fontSize: 32,
  },
  taskTextContainer: {
    alignItems: 'center',
    marginBottom: 14,
    paddingHorizontal: 10,
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
});
