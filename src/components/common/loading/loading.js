import { View, ActivityIndicator, StyleSheet, Text } from 'react-native'
import React from 'react'
import colors from '../../constants/colors/colors'

export default function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={'large'} color={colors.buttonColor} />
      <Text>Loading...</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})