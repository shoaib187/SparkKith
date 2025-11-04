import { View, StyleSheet } from 'react-native'
import React from 'react'
import Header from '../../../components/common/header/header'
import TextButton from '../../../components/common/textButton/textButton'

export default function Notifications({ navigation }) {
  return (
    <View style={styles.container}>
      <Header title={"Notifications"} navigation={navigation} />
      <View style={styles.wrapper}>
        <TextButton title={"Enable Push Notifications"} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    marginHorizontal: 16,
    borderRadius: 10,
    overflow: "hidden",
    paddingHorizontal: 12,
    backgroundColor: '#fff'
  }
})