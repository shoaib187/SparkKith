import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { screens } from '../../components/constants/screens/screens';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={screens.Home} />
      <Stack.Screen name="DailyStreaks" component={screens.DailyStreak} />
    </Stack.Navigator>
  );
}


export { HomeStack }