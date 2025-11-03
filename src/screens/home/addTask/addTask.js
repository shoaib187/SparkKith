import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Header from "../../../components/common/header/header";
import colors from "../../../components/constants/colors/colors";
import { FONT_SIZES } from "../../../components/constants/sizes/responsiveFont";
import SuggestionCard from "../../../components/common/suggestionCard/suggestionCard";
import BottomSheet from "../../../components/common/bottomSheet/bottomSheet";
import DateTimePicker from "../../../components/common/dateTimePicker/dateTimePicker";

export default function AddTask({ navigation }) {
  const [visible, setVisible] = useState(false)
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const suggestions = [
    {
      id: "1",
      icon: require("../../../../assets/png/goal.png"),
      title: "Focus Session",
      desc: "Block distractions and stay on one task.",
    },
    {
      id: "2",
      icon: require("../../../../assets/png/goal.png"),
      title: "Stretch Break",
      desc: "Relax your muscles and reset your posture.",
    },
    {
      id: "3",
      icon: require("../../../../assets/png/goal.png"),
      title: "Meditation",
      desc: "Calm your mind and improve focus.",
    },
  ];

  return (
    <View style={styles.container}>
      <Header title={"Add Task"} navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Top Icon */}
        <View style={styles.addTaskWrapper}>
          <View style={styles.iconBg}>
            <Image
              source={require("../../../../assets/png/goal.png")}
              style={styles.iconImage}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.titleInput}
              placeholder="Task title..."
              placeholderTextColor="#9CA3AF"
              value={title}
              onChangeText={setTitle}
            />
          </View>
          {/* Date & Time */}
          <TouchableOpacity onPress={() => setVisible(!visible)} style={styles.dateContainer}>
            <View style={styles.dateIconBg}>
              <Image
                source={require("../../../../assets/png/calendar.png")}
                style={styles.dateIcon}
              />
            </View>
            <Text style={styles.dateText}>Nov 3, 2025 - 10:00 AM</Text>
          </TouchableOpacity>
          {/* Description */}
          <View style={styles.descriptionContainer}>
            <TextInput
              style={styles.descriptionInput}
              placeholder="Add task details..."
              placeholderTextColor="#9CA3AF"
              multiline
              numberOfLines={6}
              textAlignVertical="top"
              value={description}
              onChangeText={setDescription}
            />
          </View>
        </View>



        {/* Suggestions Section */}
        <Text style={styles.suggestionHeading}>Suggestions</Text>
        <FlatList
          data={suggestions}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 14 }}
          renderItem={({ item }) => (
            <SuggestionCard item={item} />
          )}
          scrollEnabled={false}
        />
      </ScrollView>
      <BottomSheet visible={visible} onClose={() => setVisible(!visible)}>
        <DateTimePicker />
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor
  },
  addTaskWrapper: {
    backgroundColor: colors.white,
    marginHorizontal: 14,
    borderRadius: 14,
    padding: 14
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  iconBg: {
    width: 50,
    height: 50,
    backgroundColor: "#E6D7C420",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  iconImage: {
    width: 36,
    height: 36,
    resizeMode: "contain",
  },
  addTaskText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginTop: 12,
  },
  inputContainer: {
    marginBottom: 18,
  },
  titleInput: {
    fontSize: 16,
    paddingVertical: 8,
    color: "#111827",
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "#E0F2FE",
  },
  dateIconBg: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: "#E6D7C420",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  dateIcon: {
    width: 22,
    height: 22,
    resizeMode: "contain",
  },
  dateText: {
    fontSize: 15,
    color: "#5B829A",
    fontWeight: "500",
  },
  descriptionContainer: {
    backgroundColor: "#FDFCFC",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginTop: 14
  },
  descriptionInput: {
    fontSize: 15,
    color: "#111827",
    height: 90,
    paddingLeft: 12
  },
  suggestionHeading: {
    fontSize: FONT_SIZES.lg,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 10,
    marginLeft: 14,
    marginTop: 14
  },

});
