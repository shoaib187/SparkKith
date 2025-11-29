import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import colors from "../../constants/colors/colors";

const reasons = [
  { id: "me", label: "Me", icon: require("../../../../assets/reasons/me.png") },
  { id: "partner", label: "Partner", icon: require("../../../../assets/reasons/partner.png") },
  { id: "family", label: "Family", icon: require("../../../../assets/reasons/family.png") },
  { id: "friends", label: "Friends", icon: require("../../../../assets/reasons/friends.png") },
  { id: "study", label: "Study", icon: require("../../../../assets/reasons/study.png") },
  { id: "work", label: "Work", icon: require("../../../../assets/reasons/work.png") },
  { id: "health", label: "Health", icon: require("../../../../assets/reasons/health.png") },
];


const getReasonIcon = (id) => {
  const reason = reasons.find(r => r.id === id);
  return reason ? reason.icon : null;
};


const MoodCard = ({ style, mood, time, icon, tags = [], note }) => {
  return (
    <View style={[styles.card, style]}>
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
          {/* {tags.map((tag, index) => (
            <View key={index} style={styles.tag}>
              {tag.icon && <Image source={tag.icon} style={styles.tagIcon} />}
              <Text numberOfLines={2} style={styles.tagText}>{tag.label}</Text>
            </View>
          ))} */}
          {tags.map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Image source={getReasonIcon(tag.label)} style={styles.tagIcon} />
              <Text numberOfLines={2} style={styles.tagText}>{tag.label}</Text>
            </View>
          ))}

        </View>
      )}

      {note ? <Text numberOfLines={2} style={styles.noteText}>{note}</Text> : null}
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
    gap: 10,
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    // flex: 1,
    // flexWrap: 'wrap',
    justifyContent: 'center',
    width: '31%'
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
    textTransform: 'capitalize', flex: 1
  },
  noteText: {
    marginTop: 8,
    fontSize: 14,
    color: "#444",
  },
});

export default MoodCard;
