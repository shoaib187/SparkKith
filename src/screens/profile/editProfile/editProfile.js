import { View, StyleSheet, ScrollView, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import InputField from '../../../components/common/inputField/inputField'
import colors from '../../../components/constants/colors/colors'
import Header from '../../../components/common/header/header'
import Button from '../../../components/common/button/button'
import { useDispatch, useSelector } from 'react-redux'
import { editUserProfile } from '../../../redux/slices/authSlice/authSlice'
import { fetchUserProfile } from '../../../redux/slices/profileSlice/profileSlice'

export default function EditProfile({ navigation }) {
  const dispatch = useDispatch()
  const { user, token, loading } = useSelector(state => state.auth)

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
      ...(form.password && { password: form.password }),
    }

    const res = await dispatch(editUserProfile({ updatedData: payload, token }))
    await dispatch(fetchUserProfile(token));
    navigation.goBack();
    console.log("res", res)
  }

  return (
    <View style={styles.container}>
      <Header title={"Edit Profile"} navigation={navigation} />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
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
          title={!loading ? "Save" : "Updating profile..."}
          onPress={handleEdit}
          style={styles.saveButton}
          textColor="black"
        />

        {/* {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color={colors.buttonColor} />
            <Text style={styles.loadingText}>Updating profile...</Text>
          </View>
        )} */}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
  },
  scrollContainer: {
    paddingHorizontal: 16,
  },
  saveButton: {
    backgroundColor: "#FAF6F0",
    marginTop: 14,
  },
  loadingContainer: {
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 5,
    color: colors.buttonColor,
  },
})
