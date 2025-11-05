import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthStack } from '../authStack/authStack';
import TabNavigator from '../tabNavigator/tabNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'react-native';
import colors from '../../components/constants/colors/colors';

export default function AppNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        setIsLoggedIn(!!token);
      } catch (e) {
        console.log('Error checking login status', e);
      }
    };
    checkLoginStatus();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar backgroundColor={colors.bgColor} animated showHideTransition={"fade"} barStyle={'dark-content'} />
      {isLoggedIn ? <TabNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
}
