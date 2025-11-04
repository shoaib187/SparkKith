import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import InputField from '../../../components/common/inputField/inputField'
import colors from '../../../components/constants/colors/colors'
import Header from '../../../components/common/header/header'
import Button from '../../../components/common/button/button'

export default function EditProfile({ navigation }) {
  return (
    <View style={styles.container}>
      <Header title={"Edit Profile"} navigation={navigation} />
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16 }} showsVerticalScrollIndicator={false}>
        <InputField label={"First Name"} placeholder={"John"} />
        <InputField label={"Last Name"} placeholder={"Doe"} />
        <InputField label={"Userame"} placeholder={"John doe"} />
        <InputField label={"Email"} keyboardType='mail' placeholder={"example@gmail.com"} />
        <InputField label={"Password"} secureTextEntry placeholder={"*******"} />
        <Button title='Save' style={{
          backgroundColor: "#FAF6F0", marginTop: 14
        }} textColor='black' />
      </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor
  }
})