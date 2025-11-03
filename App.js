import { StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import SplashScreen from 'react-native-splash-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/appNavigator/appNavigator';

export default function App() {
  useEffect(() => {
    const timer = setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <AppNavigator />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})