import { View, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import Header from '../../../components/common/header/header'
import TextButton from '../../../components/common/textButton/textButton'
import { requestAndroidPermission, sendNotification } from '../../../utils/notification/api'

export default function Notifications({ navigation }) {
  useEffect(() => {
    requestAndroidPermission()
  }, [])
  const handleTest = async () => {
    await sendNotification({
      title: 'Test Notification',
      body: 'You completed your daily task! 🎉'
    });
  }
  return (
    <View style={styles.container}>
      <Header title={"Notifications"} navigation={navigation} />
      <View style={styles.wrapper}>
        <TextButton onPress={handleTest} title={"Enable Push Notifications"} />
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