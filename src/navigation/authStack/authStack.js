import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { screens } from '../../components/constants/screens/screens';
import Community from '../../screens/auth/community/community';
import TabNavigator from '../tabNavigator/tabNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

const AuthStack = () => {
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        setInitialRoute(token ? 'Login' : 'ContinueWith');
      } catch (e) {
        console.log('Error reading token:', e);
        setInitialRoute('Onboarding');
      }
    };
    checkToken();
  }, []);

  // Don't render the navigator until initialRoute is known
  if (!initialRoute) return null;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRoute}>
      <Stack.Screen name="ContinueWith" component={screens.ContinueWith} />
      <Stack.Screen name="Onboarding" component={screens.OnboardingScreen} />
      <Stack.Screen name="Community" component={Community} />
      <Stack.Screen name="Register" component={screens.Register} />
      <Stack.Screen name="Login" component={screens.Login} />
      <Stack.Screen name="Welcome" component={screens.WelcomPage} />
      <Stack.Screen name="Tab" component={TabNavigator} />
    </Stack.Navigator>
  );
};

export { AuthStack };
