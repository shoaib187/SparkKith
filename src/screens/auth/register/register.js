import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  ToastAndroid
} from 'react-native';
import axios from 'axios';
import { baseUrl } from '../../../utils/api';
import Header from '../../../components/common/header/header';
import InputField from '../../../components/common/inputField/inputField';
import colors from '../../../components/constants/colors/colors';
import Button from '../../../components/common/button/button';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../redux/slices/authSlice/authSlice';

export default function Register({ navigation, route }) {
  const { activeItem, userInfo } = route.params;
  const dispatch = useDispatch()
  console.log(activeItem, userInfo)
  const user = userInfo?.data?.user
  // console.log("user", user)

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [sparkId, setSparkId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // autofill Name and Spark ID from activeItem
  // useEffect(() => {
  //   if (activeItem) {
  //     setName(activeItem?.name || user?.familyName || ''); // use title as name
  //     setSparkId(activeItem?._id || '');
  //   }
  // }, [activeItem]);
  useEffect(() => {
    if (userInfo?.type === 'success' && userInfo?.data?.user) {
      // Google login data
      const googleUser = userInfo.data.user;
      setName(googleUser.name || '');
      setEmail(googleUser.email || '');
      setSparkId(activeItem?._id || '');
    } else if (activeItem) {
      // Spark data
      setName(activeItem?.name || '');
      setSparkId(activeItem?._id || '');
      setEmail(''); // reset email if not from Google
    }
  }, [activeItem, userInfo]);


  // Handle registration
  const handleRegister = async () => {
    if (!email?.trim() || !password.trim() || !username?.trim()) {
      Alert.alert('Please fill all required fields');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('username', username);
    formData.append('sparkId', sparkId);
    formData.append('email', email);
    formData.append('password', password);

    // optional include image if available
    if (activeItem?.imageUrl) {
      formData.append('profilePicture', {
        uri: activeItem.imageUrl,
        type: 'image/jpeg',
        name: `${activeItem?.name}.jpg`,
      });
    }

    console.log('FormData ready:', {
      name,
      username,
      sparkId,
      email,
      password,
      image: activeItem?.imageUrl,
    });
    // return

    try {
      setLoading(true);

      const res = await dispatch(registerUser(formData))
      if (res.payload.status === "success") {
        setLoading(false);
        Alert.alert('Success', 'Registration successful!');
        navigation.navigate('Login');
      }
      if (res.payload.message === "Email already exists") {
        ToastAndroid.show("Email already in use!", ToastAndroid.LONG)
      }

    } catch (err) {
      setLoading(false);
      console.log('Error:', err.response?.data);
      Alert.alert('Error', err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false)
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Register" navigation={navigation} />
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16 }} showsVerticalScrollIndicator={false}>

        {/* Spark Avatar */}
        <View style={styles.imagePreview}>
          <Image source={{ uri: activeItem?.imageUrl }} style={styles.image} />
          <Text style={{ textAlign: 'center', marginTop: 6 }}>{activeItem?.title}</Text>
        </View>

        {/* Input Fields */}
        <InputField label="Name" editable={false} placeholder="John Doe" value={name} onChangeText={setName} />
        <InputField label="Username" placeholder="johndoe" value={username} onChangeText={setUsername} />
        <InputField label="Spark ID" editable={false} value={sparkId} />
        <InputField label="Email" placeholder="example@gmail.com" keyboardType="email-address" value={email} onChangeText={setEmail} />
        <InputField label="Password" placeholder="*******" secureTextEntry value={password} onChangeText={setPassword} />

        <Button
          title={loading ? 'Registering...' : 'Register'}
          style={{ backgroundColor: '#FAF6F0', marginTop: 14 }}
          textColor="black"
          onPress={handleRegister}
        // onPress={() => navigation.navigate("Login")}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
  },
  imagePreview: {
    marginTop: 20,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    resizeMode: 'cover',
  },
});
