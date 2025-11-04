import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function TextButton({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
      <Image
        source={require('../../../../assets/png/chevron.png')}
        style={styles.icon}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: .6,
    borderBottomColor: '#ddd'
  },
  title: {
    fontSize: 15,
    color: '#111827',
    fontWeight: '600',
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: '#9CA3AF', // soft gray arrow
  },
});
