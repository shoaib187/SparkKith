// src/screens/auth/ContinueWith.js
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Button from '../../../components/common/button/button';
import { FONT_SIZES } from '../../../components/constants/sizes/responsiveFont';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

export default function ContinueWith({ navigation, route }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '601942645800-ltrrr2pat9aoo03c96dlrd346v5bfn42.apps.googleusercontent.com',
      offlineAccess: true,
      forceCodeForRefreshToken: true,
    });
  }, []);

  const googleSignIn = async () => {
    if (loading) return;
    setLoading(true);

    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const userInfo = await GoogleSignin.signIn();
      if (userInfo) {
        // Pass userInfo object directly — your Register screen reads userInfo.user or userInfo
        navigation.navigate('Onboarding', { userInfo });
      }
    } catch (error) {
      // Better error handling for release builds
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled sign in');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Sign-in already in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play services not available or outdated');
      } else {
        console.log('Google Sign-In Error:', error);
      }
    } finally {
      setLoading(false);
    }
  };

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
          title={loading ? 'Signing in...' : 'Continue with Google'}
          onPress={googleSignIn}
          disabled={loading}
          icon={require('../../../../assets/png/google.png')}
          style={[styles.button, { backgroundColor: '#fff' }]}
          textStyle={{ color: '#000' }}
        />

        <Button
          title="Continue with Email"
          onPress={() => navigation.navigate('Onboarding')}
          icon={require('../../../../assets/png/email.png')}
          style={[styles.button, { backgroundColor: 'black' }]}
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
    paddingHorizontal: 16,
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
    position: 'absolute',
    bottom: 20,
  },
  button: {
    width: '100%',
    elevation: 2,
  },
});


// // src/screens/auth/ContinueWith.js
// import React, { useEffect, useState } from 'react';
// import { View, Text, Image, StyleSheet } from 'react-native';
// import Button from '../../../components/common/button/button';
// import { FONT_SIZES } from '../../../components/constants/sizes/responsiveFont';
// import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

// export default function ContinueWith({ navigation, route }) {
//   const { activeItem, chosen } = route.params || {};
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     GoogleSignin.configure({
//       webClientId: '601942645800-ltrrr2pat9aoo03c96dlrd346v5bfn42.apps.googleusercontent.com',
//       offlineAccess: true,
//       forceCodeForRefreshToken: true,
//     });
//   }, []);

//   const googleSignIn = async () => {
//     if (loading) return;
//     setLoading(true);

//     try {
//       await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
//       const userInfo = await GoogleSignin.signIn();
//       if (userInfo) {
//         // Pass userInfo object directly — your Register screen reads userInfo.user or userInfo
//         navigation.navigate('Register', { activeItem, userInfo, chosen });
//       }
//     } catch (error) {
//       // Better error handling for release builds
//       if (error.code === statusCodes.SIGN_IN_CANCELLED) {
//         console.log('User cancelled sign in');
//       } else if (error.code === statusCodes.IN_PROGRESS) {
//         console.log('Sign-in already in progress');
//       } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
//         console.log('Play services not available or outdated');
//       } else {
//         console.log('Google Sign-In Error:', error);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Image
//         source={require('../../../../assets/png/app_logo.png')}
//         style={styles.logo}
//         resizeMode="contain"
//       />

//       <Text style={styles.subtitle}>
//         A fun way to light the path to wellness — one spark at a time.
//       </Text>

//       <View style={styles.buttonContainer}>
//         <Button
//           title={loading ? 'Signing in...' : 'Continue with Google'}
//           onPress={googleSignIn}
//           disabled={loading}
//           icon={require('../../../../assets/png/google.png')}
//           style={[styles.button, { backgroundColor: '#fff' }]}
//           textStyle={{ color: '#000' }}
//         />

//         <Button
//           title="Continue with Email"
//           onPress={() => navigation.navigate('Register', { activeItem, chosen })}
//           icon={require('../../../../assets/png/email.png')}
//           style={[styles.button, { backgroundColor: 'black' }]}
//         />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFB858',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingHorizontal: 16,
//   },
//   logo: {
//     width: 220,
//     height: 220,
//     marginBottom: 20,
//   },
//   subtitle: {
//     fontSize: FONT_SIZES.md,
//     color: '#333',
//     textAlign: 'center',
//     lineHeight: 22,
//     marginBottom: 40,
//     fontWeight: '500',
//   },
//   buttonContainer: {
//     width: '100%',
//     alignItems: 'center',
//     gap: 14,
//     position: 'absolute',
//     bottom: 20,
//   },
//   button: {
//     width: '100%',
//     elevation: 2,
//   },
// });
