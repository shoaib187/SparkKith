import React from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";

export default function Header({ title, navigation, onSettingPress, showSettings = false }) {
  return (
    <View style={styles.headerContainer}>
      <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
        <Image
          source={require("../../../../assets/png/back-arrow.png")}
          style={styles.backIcon}
        />
      </Pressable>
      <Text style={styles.headerTitle}>{title}</Text>
      {!showSettings && <View style={styles.rightPlaceholder} />}
      {showSettings && <Pressable onPress={onSettingPress} style={styles.backButton}>
        <Image
          source={require("../../../../assets/icons/settings.png")}
          style={styles.backIcon}
        />
      </Pressable>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 14
  },
  backButton: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  backIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    textAlign: "center",
    flex: 1,
  },
  rightPlaceholder: {
    width: 30, // keeps title centered even if no right icon
  },
});
