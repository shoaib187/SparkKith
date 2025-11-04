import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import colors from "../../constants/colors/colors";

const MoodCard = ({ mood, time, icon, tags = [], note }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Image source={icon} style={styles.icon} />
        </View>
        <View>
          <Text style={styles.moodText}>{mood}</Text>
          <Text style={styles.timeText}>{time}</Text>
        </View>
      </View>

      {tags.length > 0 && (
        <View style={styles.tagsContainer}>
          {tags.map((tag, index) => (
            <View key={index} style={styles.tag}>
              {tag.icon && <Image source={tag.icon} style={styles.tagIcon} />}
              <Text style={styles.tagText}>{tag.label}</Text>
            </View>
          ))}
        </View>
      )}

      {note ? <Text style={styles.noteText}>{note}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    // width: 48,
    // height: 48,
    borderRadius: 16,
    // backgroundColor: "#E6F7FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  icon: {
    width: 45,
    height: 45,
    resizeMode: "contain",
  },
  moodText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
  },
  timeText: {
    fontSize: 13,
    color: colors.description,
    marginTop: 2,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    margin: 4,
    flex: .3,
  },
  tagIcon: {
    width: 16,
    height: 16,
    resizeMode: "contain",
    marginRight: 6,
  },
  tagText: {
    fontSize: 13,
    color: "#333",
  },
  noteText: {
    marginTop: 8,
    fontSize: 14,
    color: "#444",
  },
});

export default MoodCard;
