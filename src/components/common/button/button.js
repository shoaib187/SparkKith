import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native';

const Button = ({
  title = 'Button',
  onPress,
  bgColor = '#FFB858',
  textColor = '#fff',
  disabled = false,
  style,
  textStyle,
  icon,
  iconStyle,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
      style={[
        styles.button,
        { backgroundColor: bgColor, opacity: disabled ? 0.6 : 1 },
        style,
      ]}
    >
      <View style={styles.content}>
        {icon && <Image source={icon} style={[styles.icon, iconStyle]} />}
        <Text style={[styles.text, { color: textColor }, textStyle]}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',  // to align icon + text in a row
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,                // spacing between icon and text (React Native 0.71+)
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 16,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
});

export default Button;
