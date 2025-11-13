import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { useDispatch } from 'react-redux';
import Header from '../../../components/common/header/header';
import InputField from '../../../components/common/inputField/inputField';
import colors from '../../../components/constants/colors/colors';
import Button from '../../../components/common/button/button';
import { loginUser } from '../../../redux/slices/authSlice/authSlice';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export default function Login({ navigation }) {
  const dispatch = useDispatch();

  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '710294867597-3nfa26ohnpphnk3r0ppj79qpolevjp5k.apps.googleusercontent.com',
      offlineAccess: true,
      scopes: ['profile', 'email'],
    });
  }, []);

  const handleLogin = async () => {
    // validation checks
    if (!emailOrUsername.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailOrUsername.trim())) {
      Alert.alert('Invalid Email', 'Please enter a valid email address');
      return;
    }

    try {
      setLoading(true);

      const res = await dispatch(loginUser({ emailOrUsername, password }));
      const data = res.payload;
      console.log(data)

      if (data?.token) {
        setLoading(false);
        Alert.alert('Welcome!', 'Login successful');
        navigation.replace('Tab'); // replace with your main/home screen
      } else {
        setLoading(false);
        Alert.alert('Login Failed', data?.message || 'Invalid credentials');
      }
    } catch (error) {
      setLoading(false);
      console.log('Login Error:', error);
      Alert.alert('Error', error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Login" navigation={navigation} />

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.welcomeText}>Welcome Back 👋</Text>

        <InputField
          label="Email"
          placeholder="example@gmail.com"
          keyboardType="email-address"
          value={emailOrUsername}
          onChangeText={setEmailOrUsername}
        />

        <InputField
          label="Password"
          placeholder="*******"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Button
          title={loading ? 'Logging in...' : 'Login'}
          style={{ backgroundColor: '#FAF6F0', marginTop: 14 }}
          textColor="black"
          onPress={handleLogin}
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
  welcomeText: {
    fontSize: 22,
    fontWeight: '600',
    marginVertical: 20,
    color: '#333',
  },
});
