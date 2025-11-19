import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { screens } from '../../components/constants/screens/screens';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'scale_from_center' }} initialRouteName='HomePage'>
      <Stack.Screen name="HomePage" component={screens.Home} />
      <Stack.Screen name="DailyStreak" component={screens.DailyStreak} />
      <Stack.Screen name="TaskCompleted" component={screens.TaskCompleted} />
      <Stack.Screen name="ReflectMood" component={screens.ReflectMood} />
      <Stack.Screen name="AddTask" component={screens.AddTask} />
    </Stack.Navigator>
  );
}


export { HomeStack }