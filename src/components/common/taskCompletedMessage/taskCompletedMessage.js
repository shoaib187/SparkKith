import { StyleSheet, TouchableOpacity } from "react-native";
import { Text } from 'react-native'
import React from 'react'
import Button from "../button/button";

export default function TaskCompletedMessage({ undoTask, onPress, message, isSkipped }) {
  return (
    <TouchableOpacity style={styles.completedContainer} onPress={onPress} activeOpacity={1}>
      <Text style={styles.completedEmoji}>🎉</Text>
      <Text style={styles.completedTitle}>{message}</Text>
      <Text style={styles.completedSubtitle}>Great job staying consistent! 🌟</Text>
      {!isSkipped &&
        <Button title="Undo Task" onPress={undoTask} style={{ width: '100%', marginTop: 20 }} />
      }
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  completedContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    marginVertical: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
  },
  completedEmoji: {
    fontSize: 40,
    marginBottom: 10,
  },
  completedTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: "#222",
    textAlign: 'center',
  },
  completedSubtitle: {
    fontSize: 14,
    // color: '#047857',
    textAlign: 'center',
    marginTop: 6,
  },

})