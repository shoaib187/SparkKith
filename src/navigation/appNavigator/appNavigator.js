import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthStack } from '../authStack/authStack';
import TabNavigator from '../tabNavigator/tabNavigator';
import { StatusBar } from 'react-native';
import colors from '../../components/constants/colors/colors';
import { useSelector } from 'react-redux';

export default function AppNavigator() {
  const { isAuthenticated } = useSelector(state => state.auth)

  return (
    <NavigationContainer>
      <StatusBar backgroundColor={colors.bgColor} animated showHideTransition={"fade"} barStyle={'dark-content'} />
      {isAuthenticated ? <TabNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
}
