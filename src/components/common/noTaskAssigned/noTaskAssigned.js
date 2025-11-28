import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Button from '../button/button'

export default function NoTaskAssigned({ navigation }) {
  return (
    <View style={styles.noTaskContainer}>
      <View style={styles.noTaskIcon}>
        <Text style={styles.noTaskEmoji}>📝</Text>
      </View>
      <Text style={styles.noTaskTitle}>No tasks for today</Text>
      <Text style={styles.noTaskSubtitle}>
        Enjoy your free time or create a new task to stay productive!
      </Text>
      {/* <Button
        title='Create a Task'
        style={styles.createTaskButton}
        onPress={() => navigation.navigate("AddTask")}
      /> */}
    </View>
  )
}

const styles = StyleSheet.create({
  noTaskContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    marginVertical: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
  },
  noTaskIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  noTaskEmoji: {
    fontSize: 32,
  },
  noTaskTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  noTaskSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  createTaskButton: {
    width: '100%'
  }
})