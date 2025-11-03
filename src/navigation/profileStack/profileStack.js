import React from 'react';

import { screens } from '../../components/constants/screens/screens';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ProfileHomePage" component={screens.ProfileHomePage} />
      {/* <Stack.Screen name="DailyStreaks" component={screens.DailyStreak} /> */}
    </Stack.Navigator>
  );
}


export { ProfileStack }