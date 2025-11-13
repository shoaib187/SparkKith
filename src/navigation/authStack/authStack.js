import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { screens } from '../../components/constants/screens/screens';
import Community from '../../screens/auth/community/community';
import TabNavigator from '../tabNavigator/tabNavigator';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }} initialRouteName='Onboarding'>
      <Stack.Screen name="Onboarding" component={screens.OnboardingScreen} />
      <Stack.Screen name="Community" component={Community} />
      <Stack.Screen name="ContinueWith" component={screens.ContinueWith} />
      <Stack.Screen name="Register" component={screens.Register} />
      <Stack.Screen name="Login" component={screens.Login} />
      <Stack.Screen name="Welcome" component={screens.WelcomPage} />
      <Stack.Screen name="Tab" component={TabNavigator} />
    </Stack.Navigator>
  );
}


export { AuthStack }