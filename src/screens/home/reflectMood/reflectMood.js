import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import Header from "../../../components/common/header/header";
import { FONT_SIZES } from "../../../components/constants/sizes/responsiveFont";
import Button from "../../../components/common/button/button";
import colors from "../../../components/constants/colors/colors";

const moods = [
  { id: "okay", label: "Okay", icon: require("../../../../assets/icons/okay.png") },
  { id: "good", label: "Good", icon: require("../../../../assets/icons/good.png") },
  { id: "great", label: "Great", icon: require("../../../../assets/icons/great.png") },
  { id: "sad", label: "Sad", icon: require("../../../../assets/icons/sad.png") },
  { id: "angry", label: "Angry", icon: require("../../../../assets/icons/angry.png") },
];

const reasons = [
  { id: "me", label: "Me", icon: require("../../../../assets/reasons/me.png") },
  { id: "partner", label: "Partner", icon: require("../../../../assets/reasons/partner.png") },
  { id: "family", label: "Family", icon: require("../../../../assets/reasons/family.png") },
  { id: "friends", label: "Friends", icon: require("../../../../assets/reasons/friends.png") },
  { id: "study", label: "Study", icon: require("../../../../assets/reasons/study.png") },
  { id: "work", label: "Work", icon: require("../../../../assets/reasons/work.png") },
  { id: "health", label: "Health", icon: require("../../../../assets/reasons/health.png") },
];

export default function ReflectMood({ navigation }) {
  const [selectedMood, setSelectedMood] = useState(null);
  const [selectedReasons, setSelectedReasons] = useState([]);
  const [note, setNote] = useState("");

  const toggleReason = (id) => {
    setSelectedReasons((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation} title={"Reflect"} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 14 }}>
        {/* Mood Selection */}
        <View style={styles.moodContainer}>
          {moods.map((mood) => (
            <Pressable
              key={mood.id}
              onPress={() => setSelectedMood(mood.id)}
              style={[
                styles.moodItem,
                selectedMood === mood.id && styles.moodSelected,
              ]}
            >
              <Image source={mood.icon} style={styles.moodIcon} />
              <Text style={styles.moodLabel}>{mood.label}</Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.question}>
          It’s okay to feel this way. What might be the reason behind it?
        </Text>

        {/* Reasons Grid */}
        <View style={styles.reasonsContainer}>
          {reasons.map((reason) => (
            <Pressable
              key={reason.id}
              onPress={() => toggleReason(reason.id)}
              style={[
                styles.reasonCard,
                selectedReasons.includes(reason.id) && styles.reasonSelected,
              ]}
            >
              <Image source={reason.icon} style={styles.reasonIcon} />
              <Text style={styles.reasonLabel}>{reason.label}</Text>
            </Pressable>
          ))}
        </View>

        {/* Note Input */}
        <TextInput
          style={styles.textInput}
          placeholder="Nothing special, just a calm and steady day."
          placeholderTextColor="#9CA3AF"
          value={note}
          onChangeText={setNote}
          multiline
        />

        {/* Done Button */}
        <Button title="Done" style={styles.doneButton} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6FBFD",
  },
  header: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
    color: "#111827",
  },
  moodContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  moodItem: {
    alignItems: "center",
    padding: 8,
    borderRadius: 16,
  },
  moodSelected: {
    backgroundColor: "#E0F2FE",
  },
  moodIcon: {
    width: 40,
    height: 40,
    marginBottom: 4,
  },
  moodLabel: {
    fontSize: 12,
    color: "#111827",
  },
  question: {
    fontSize: FONT_SIZES.md,
    marginVertical: 20,
    fontWeight: '900'
  },
  reasonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  reasonCard: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: '#f9f9f9',
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    width: '48%'
  },
  reasonSelected: {
    borderWidth: 1,
    borderColor: "#FDBA74",
    backgroundColor: "#FFF7ED",
  },
  reasonIcon: {
    width: 18,
    height: 18,
    marginRight: 6,
  },
  reasonLabel: {
    fontSize: 14,
    color: "#111827",
  },
  textInput: {
    marginTop: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 14,
    fontSize: 14,
    textAlignVertical: "top",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    minHeight: 100,
  },
  doneButton: {
    marginTop: 25,
    backgroundColor: colors.blue
  },
});
