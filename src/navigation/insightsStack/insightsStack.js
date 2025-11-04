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
      // initialRouteName='InsightsHomePage'
      initialRouteName='History'
    >
      <Stack.Screen name="History" component={screens.History} />
      <Stack.Screen name="InsightsHomePage" component={screens.InsightsHomePage} />
    </Stack.Navigator>
  );
}


export { InsightsStack }