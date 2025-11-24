import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  ToastAndroid,
  TouchableOpacity
} from 'react-native';

import Header from '../../../components/common/header/header';
import InputField from '../../../components/common/inputField/inputField';
import colors from '../../../components/constants/colors/colors';
import Button from '../../../components/common/button/button';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../redux/slices/authSlice/authSlice';

export default function Register({ navigation, route }) {
  const { activeItem, userInfo, chosen } = route.params;
  const dispatch = useDispatch()
  console.log("register activeItem", chosen)
  const user = userInfo?.data?.user
  // console.log("user", user)

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [sparkId, setSparkId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userInfo?.type === 'success' && userInfo?.data?.user) {
      // Google login data
      const googleUser = userInfo.data.user;
      setName(googleUser.name || '');
      setEmail(googleUser.email || '');
      setSparkId(chosen?._id || '');
    } else if (activeItem) {
      // Spark data
      setName(activeItem?.title || '');
      setSparkId(chosen?._id || '');
      setEmail(''); // reset email if not from Google
    }
  }, [activeItem, userInfo, chosen]);

  // Function to get image URI from local asset number
  const getImageUriFromAsset = (imageAsset) => {
    // For local assets, React Native uses numbers that reference bundled assets
    if (typeof imageAsset === 'number') {
      // Get image source from the asset
      const imageSource = Image.resolveAssetSource(imageAsset);
      return imageSource.uri;
    }
    return null;
  };

  // Function to get image as string (URI/path)
  const getImageAsString = (imageAsset) => {
    if (typeof imageAsset === 'number') {
      // Local asset - get the URI
      return getImageUriFromAsset(imageAsset);
    } else if (typeof imageAsset === 'string') {
      // Already a string (URL)
      return imageAsset;
    }
    return null;
  };

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

    // Handle image as string
    try {
      if (activeItem?.image) {
        const imageUri = getImageAsString(activeItem.image);
        if (imageUri) {
          formData.append('profilePicture', {
            uri: imageUri,
            type: 'image/jpeg', // or 'image/png' depending on your image
            name: 'profile.jpg',
          });
        }
      } else if (activeItem?.imageUrl) {
        // If imageUrl exists, use that instead
        formData.append('profilePicture', activeItem.imageUrl);
      }
    } catch (error) {
      console.log('Error preparing image:', error);
    }

    console.log("formData", formData)
    // return

    try {
      setLoading(true);

      const res = await dispatch(registerUser(formData))
      if (res.payload.status === "success") {
        setLoading(false);
        ToastAndroid.show('Registration successful!', ToastAndroid.LONG);
        navigation.navigate('Welcome');
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

  // Function to display the image properly
  const getImageSource = () => {
    if (activeItem?.image) {
      if (typeof activeItem.image === 'number') {
        return activeItem.image; // Local asset
      } else if (typeof activeItem.image === 'string') {
        return { uri: activeItem.image }; // URL
      }
    } else if (activeItem?.imageUrl) {
      return { uri: activeItem.imageUrl }; // URL from API
    }
    return require('../../../../assets/png/user.jpg'); // Fallback image
  };

  return (
    <View style={styles.container}>
      <Header title="Register" navigation={navigation} />
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16 }} showsVerticalScrollIndicator={false}>

        {/* Spark Avatar */}
        <View style={styles.imagePreview}>
          <Image source={getImageSource()} style={styles.image} />
          <Text style={{ textAlign: 'center', marginTop: 6 }}>{activeItem?.title}</Text>
        </View>

        {/* Input Fields */}
        <InputField label="Name" editable={false} placeholder="John Doe" value={name} onChangeText={setName} />
        <InputField label="Username" placeholder="johndoe" value={username} onChangeText={setUsername} />
        <InputField label="Email" placeholder="example@gmail.com" keyboardType="email-address" value={email} onChangeText={setEmail} />
        <InputField label="Password" placeholder="*******" secureTextEntry value={password} onChangeText={setPassword} />

        <Button
          title={loading ? 'Registering...' : 'Register'}
          style={{ backgroundColor: '#FAF6F0', marginTop: 14 }}
          textColor="black"
          onPress={handleRegister}
        />
        <View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 20 }}>
          <View style={styles.signUpWrapper}>
            <Text>Already have an Account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    resizeMode: 'contain',
  },
  loginText: {
    fontWeight: '900',
    color: "black"
  },
  signUpWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4
  }
});
