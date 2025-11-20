import React from 'react';

import { screens } from '../../components/constants/screens/screens';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'scale_from_center',
      }}
    >
      <Stack.Screen name="ProfileHomePage" component={screens.ProfileHomePage} />
      <Stack.Screen name="Settings" component={screens.Settings} />
      <Stack.Screen name="EditProfile" component={screens.EditProfile} />
      <Stack.Screen name="Notifications" component={screens.Notifications} />
    </Stack.Navigator>
  );
}


export { ProfileStack }