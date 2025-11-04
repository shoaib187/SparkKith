import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { screens } from '../../components/constants/screens/screens';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={screens.Home} />
      <Stack.Screen name="DailyStreak" component={screens.DailyStreak} />
      <Stack.Screen name="TaskCompleted" component={screens.TaskCompleted} />
      <Stack.Screen name="ReflectMood" component={screens.ReflectMood} />
      <Stack.Screen name="AddTask" component={screens.AddTask} />
    </Stack.Navigator>
  );
}


export { HomeStack }