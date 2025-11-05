import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { screens } from '../../components/constants/screens/screens';

const Stack = createStackNavigator();

const CommunityStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="CommunityHomePage" component={screens.CommunityHomePage} />
    </Stack.Navigator>
  );
}


export { CommunityStack }