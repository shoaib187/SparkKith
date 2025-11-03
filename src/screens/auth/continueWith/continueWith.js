import { View, Text, Image } from 'react-native'
import React from 'react'
import Button from '../../../components/button/button'

export default function ContinueWith() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFB858' }}>
      <Image source={require("../../../../assets/png/image1.jpeg")} style={{ width: 240, height: 240 }} />
      <Text>A fun way to light the path</Text>
      <Button title={"Continue with google"} />
      <Button title={"Continue with Email"} />
    </View>
  )
}