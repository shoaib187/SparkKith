import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';


const GoogleLogin = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: "601942645800-ltrrr2pat9aoo03c96dlrd346v5bfn42.apps.googleusercontent.com"
    })
  }, []);

  const googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices()
      const userInfo = await GoogleSignin.signIn();
      console.log("user", userInfo)
    } catch (error) {
      console.log("Err", error)
    }
  }


  return (
    <View style={styles.container}>
      {user ? (
        <View style={styles.userInfo}>
          <Image source={{ uri: user.photoURL }} style={styles.image} />
          <Text style={styles.text}>Welcome {user.displayName}</Text>
          <Text style={styles.text}>{user.email}</Text>
          <TouchableOpacity onPress={googleSignIn} style={styles.button}>
            <Text style={styles.buttonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity onPress={googleSignIn} style={styles.button}>
          <Text style={styles.buttonText}>Sign In with Google</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default GoogleLogin;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  button: { backgroundColor: '#4285F4', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 5 },
  buttonText: { color: 'white', fontSize: 16 },
  userInfo: { alignItems: 'center' },
  text: { fontSize: 16, marginTop: 5 },
  image: { width: 80, height: 80, borderRadius: 40, marginBottom: 10 },
});
