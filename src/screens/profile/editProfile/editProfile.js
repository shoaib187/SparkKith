import { View, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import InputField from '../../../components/common/inputField/inputField'
import colors from '../../../components/constants/colors/colors'
import Header from '../../../components/common/header/header'
import Button from '../../../components/common/button/button'
import { useDispatch, useSelector } from 'react-redux'
import { editUserProfile } from '../../../redux/slices/authSlice/authSlice'

export default function EditProfile({ navigation }) {
  const dispatch = useDispatch()
  const { user, token } = useSelector(state => state.auth)
  console.log("user", user)

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    username: user?.username || "",
    password: "",
  })

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || '',
        email: user.email || '',
        username: user.username || '',
        password: '', // password should remain empty for security
      })
    }
  }, [user])

  const handleChange = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  const handleEdit = async () => {
    const payload = {
      name: form.name,
      email: form.email,
      username: form.username,
      ...(form.password && { password: form.password }), // only send password if entered
    }

    const res = await dispatch(editUserProfile({ updatedData: payload, token }))
    console.log("res", res)
  }

  return (
    <View style={styles.container}>
      <Header title={"Edit Profile"} navigation={navigation} />

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16 }}
        showsVerticalScrollIndicator={false}
      >
        <InputField
          label="Name"
          value={form.name}
          onChangeText={v => handleChange("name", v)}
          placeholder="John Doe"
        />

        <InputField
          label="Username"
          value={form.username}
          onChangeText={v => handleChange("username", v)}
          placeholder="john123"
        />

        <InputField
          label="Email"
          value={form.email}
          keyboardType="email-address"
          onChangeText={v => handleChange("email", v)}
          placeholder="example@gmail.com"
        />

        <InputField
          label="Password"
          value={form.password}
          secureTextEntry
          onChangeText={v => handleChange("password", v)}
          placeholder="Enter new password"
        />

        <Button
          title="Save"
          onPress={handleEdit}
          style={{
            backgroundColor: "#FAF6F0",
            marginTop: 14,
          }}
          textColor="black"
        />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
  },
})
