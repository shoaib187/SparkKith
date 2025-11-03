import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet, View } from 'react-native';
import { HomeStack } from '../homeStack/homeStack';
import { CommunityStack } from '../communityStack/communityStack';
import { InsightsStack } from '../insightsStack/insightsStack';
import { ProfileStack } from '../profileStack/profileStack';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarIcon: ({ focused }) => {
          let iconSource;
          switch (route.name) {
            case 'Home':
              iconSource = require('../../../assets/tabs/home.png');
              break;
            case 'Community':
              iconSource = require('../../../assets/tabs/users.png');
              break;
            case 'Insights':
              iconSource = require('../../../assets/tabs/progress.png');
              break;
            case 'Profile':
              iconSource = require('../../../assets/tabs/user.png');
              break;
          }

          return (
            <View
              style={[
                styles.iconContainer,
                focused && styles.focusedIconContainer, // optional focus style
              ]}
            >
              <Image
                source={iconSource}
                style={[styles.icon]}
              />
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Community" component={CommunityStack} />
      <Tab.Screen name="Insights" component={InsightsStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 60,
    paddingTop: 10,
    backgroundColor: '#fff',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 50,
  },
  focusedIconContainer: {
    backgroundColor: '#FFF4E5',
    borderRadius: 12,
    borderWidth: 1.1,
    borderColor: '#FFB858',
    height: 45,
    width: 45
  },
  icon: {
    width: 26,
    height: 26,
    resizeMode: 'contain',
  },
});
