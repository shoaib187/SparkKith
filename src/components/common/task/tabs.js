import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

export default function Tabs({ activeTab, setActiveTab }) {
  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        style={[styles.tab, activeTab === "task" && styles.activeTab]}
        onPress={() => setActiveTab("task")}
      >
        <Text
          style={[
            styles.tabText,
            activeTab === "task" && styles.activeTabText,
          ]}
        >
          Task
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tab, activeTab === "mood" && styles.activeTab]}
        onPress={() => setActiveTab("mood")}
      >
        <Text
          style={[
            styles.tabText,
            activeTab === "mood" && styles.activeTabText,
          ]}
        >
          Mood
        </Text>
      </TouchableOpacity>
    </View>
  )
}


const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#F4E7E5",
    borderRadius: 8,
    marginVertical: 10,
    marginTop: 20,
    padding: 4
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: "#EF7163",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
  },
  activeTabText: {
    color: "#FFFFFF",
  },
})