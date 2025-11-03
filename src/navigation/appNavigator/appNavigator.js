import React from 'react'
import TabNavigator from '../tabNavigator/tabNavigator'
import { NavigationContainer } from '@react-navigation/native'

export default function AppNavigator() {
  return <NavigationContainer>
    <TabNavigator />
  </NavigationContainer>
}