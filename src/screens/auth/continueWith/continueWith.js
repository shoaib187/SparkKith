import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Button from '../../../components/common/button/button';
import colors from '../../../components/constants/colors/colors';
import { FONT_SIZES } from '../../../components/constants/sizes/responsiveFont';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export default function ContinueWith({ navigation, route }) {
  const { activeItem, chosen } = route.params;
  // console.log("onboarding avatar:", activeItem);
  // console.log("commnunity", chosen);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: "601942645800-ltrrr2pat9aoo03c96dlrd346v5bfn42.apps.googleusercontent.com"
    })
  }, []);

  const googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices()
      const userInfo = await GoogleSignin.signIn();
      if (userInfo?.data?.user) {
        navigation.navigate('Register', { activeItem, userInfo })
      }
      // console.log("user", userInfo)
    } catch (error) {
      console.log("Err", error)
    }
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../../assets/png/app_logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.subtitle}>
        A fun way to light the path to wellness — one spark at a time.
      </Text>

      <View style={styles.buttonContainer}>
        <Button
          title="Continue with Google"
          onPress={googleSignIn}
          icon={require('../../../../assets/png/google.png')}
          style={[styles.button, { backgroundColor: '#fff' }]}
          textStyle={{ color: '#000' }}
        />
        <Button
          title="Continue with Email"
          onPress={() => navigation.navigate('Register', { activeItem, chosen })}
          icon={require('../../../../assets/png/email.png')}
          style={[styles.button, { backgroundColor: "black" }]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFB858',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16
  },
  logo: {
    width: 220,
    height: 220,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: FONT_SIZES.md,
    color: '#333',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 40,
    fontWeight: '500',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 14,
    position: "absolute",
    bottom: 20
  },
  button: {
    width: '100%',
    elevation: 2,
  },
  footerText: {
    marginTop: 50,
    fontSize: FONT_SIZES.sm,
    color: '#333',
    textAlign: 'center',
  },
  link: {
    color: colors.danger,
    fontWeight: '700',
  },
});
