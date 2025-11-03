import React, { useRef, useState } from "react";
import {
  Text,
  TouchableWithoutFeedback,
  Animated,
  View,
  StyleSheet,
  Image,
} from "react-native";

export default function IOSCheck({
  title = "Continue",
  onPress,
  bgColor = "#007AFF",
  textColor = "#FFFFFF",
  icon,
  iconPosition = "left",
  style,
  textStyle,
  toggleable = false, // 👈 new prop
  defaultChecked = false, // 👈 start state
  onCheckedChange, // 👈 callback when toggled
}) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [checked, setChecked] = useState(defaultChecked);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handlePress = () => {
    if (toggleable) {
      const newState = !checked;
      setChecked(newState);
      onCheckedChange && onCheckedChange(newState);
    }
    onPress && onPress();
  };

  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
    >
      <Animated.View
        style={[
          styles.button,
          {
            backgroundColor: checked ? "#34C759" : bgColor, // ✅ change color when checked
            transform: [{ scale: scaleAnim }],
            shadowColor: checked ? "#34C759" : bgColor,
          },
          style,
        ]}
      >
        <View style={styles.content}>
          {icon && iconPosition === "left" && (
            <Image source={icon} style={styles.icon} />
          )}
          <Text style={[styles.text, { color: textColor }, textStyle]}>
            {title}
          </Text>
          {icon && iconPosition === "right" && (
            <Image source={icon} style={styles.icon} />
          )}
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 18,
    alignItems: "center",
    justifyContent: "center",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 20,
    height: 20,
    marginHorizontal: 8,
    resizeMode: "contain",
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
});
