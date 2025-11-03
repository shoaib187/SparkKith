import React from 'react';

import { screens } from '../../components/constants/screens/screens';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const InsightsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="InsightsHomePage" component={screens.InsightsHomePage} />
      {/* <Stack.Screen name="DailyStreaks" component={screens.DailyStreak} /> */}
    </Stack.Navigator>
  );
}


export { InsightsStack }