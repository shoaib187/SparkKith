import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  TextInput,
  ScrollView,
  ToastAndroid,
} from "react-native";
import Header from "../../../components/common/header/header";
import { FONT_SIZES } from "../../../components/constants/sizes/responsiveFont";
import Button from "../../../components/common/button/button";
import colors from "../../../components/constants/colors/colors";
import { useDispatch, useSelector } from "react-redux";
import { createFeeling } from "../../../redux/slices/feelingSlice/feelingSlice";

const moods = [
  { id: "neutral", label: "Okay", icon: require("../../../../assets/icons/okay.png") },
  { id: "happy", label: "Good", icon: require("../../../../assets/icons/good.png") },
  { id: "excited", label: "Great", icon: require("../../../../assets/icons/great.png") },
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
  const dispatch = useDispatch();
  const { token } = useSelector(state => state.auth)
  const [selectedMood, setSelectedMood] = useState(null);
  const [selectedReasons, setSelectedReasons] = useState([]);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false)

  const toggleReason = (id) => {
    setSelectedReasons((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const handleSubmit = async () => {
    if (!selectedMood) {
      ToastAndroid.show("Please select your mood first", ToastAndroid.SHORT);
      return;
    }
    try {
      setLoading(true)
      const payload = {
        feeling: selectedMood,
        note: note?.trim() || "",
        reason: selectedReasons,
      };
      // console.log("fianle ", payload);
      const res = await dispatch(createFeeling({ payload, token }));
      if (res?.payload?.status === "success") {
        ToastAndroid.show("Mood saved successfully ❤️", ToastAndroid.SHORT);
        navigation.goBack();
      } else {
        ToastAndroid.show("Mood saved successfully ❤️", ToastAndroid.SHORT);
      }

    } catch (error) {
      ToastAndroid.show("Failed to add moode", ToastAndroid.LONG)
    } finally {
      setLoading(false)
    }
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
        <Button title={loading ? "Sending..." : "Done"} style={styles.doneButton} onPress={handleSubmit} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F6FBFD" },
  moodContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  moodItem: { alignItems: "center", padding: 8, borderRadius: 16 },
  moodSelected: { backgroundColor: "#E0F2FE" },
  moodIcon: { width: 40, height: 40, marginBottom: 4 },
  moodLabel: { fontSize: 12, color: "#111827" },
  question: { fontSize: FONT_SIZES.md, marginVertical: 20, fontWeight: "900" },
  reasonsContainer: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  reasonCard: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#f9f9f9",
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    width: "48%",
  },
  reasonSelected: { borderColor: "#FDBA74", backgroundColor: "#FFF7ED" },
  reasonIcon: { width: 18, height: 18, marginRight: 6 },
  reasonLabel: { fontSize: 14, color: "#111827" },
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
    backgroundColor: colors.blue,
  },
});
