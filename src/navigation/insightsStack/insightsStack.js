import React from 'react';

import { screens } from '../../components/constants/screens/screens';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const InsightsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'scale_from_center',
      }}
      initialRouteName='InsightsHomePage'
    >
      <Stack.Screen name="InsightsHomePage" component={screens.InsightsHomePage} />
      <Stack.Screen name="History" component={screens.History} />
      <Stack.Screen name="AddTask" component={screens.AddTask} />
    </Stack.Navigator>
  );
}


export { InsightsStack }