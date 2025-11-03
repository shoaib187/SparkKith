import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React from 'react'

export default function IconButton({ iconSrc }) {
  return (
    <TouchableOpacity style={styles.iconButton}>
      <Image source={iconSrc} style={styles.iconImage} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  iconButton: {
    width: 35, height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    backgroundColor: '#E2E2E2'
  },
  iconImage: {
    width: 16,
    height: 16,
    resizeMode: 'contain'
  }
})