import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet } from 'react-native';
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
        tabBarShowLabel: true,
        tabBarStyle: styles.tabBar,
        tabBarIcon: ({ focused }) => {
          let iconSource;

          switch (route.name) {
            case 'Home':
              iconSource = require('../../../assets/tabs/home.png');
              break;
            case 'Streak':
              iconSource = require('../../../assets/tabs/users.png');
              break;
            case 'Profile':
              iconSource = require('../../../assets/tabs/progress.png');
              break;
            case 'Settings':
              iconSource = require('../../../assets/tabs/user.png');
              break;
            default:
              iconSource = require('../../../assets/tabs/home.png');
          }

          return (
            <Image
              source={iconSource}
              style={[
                styles.icon,
                { tintColor: focused ? '#FB923C' : '#A1A1AA' },
              ]}
            />
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
    height: 70,
    backgroundColor: '#fff',
    borderTopWidth: 0,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: -3 },
  },
  icon: {
    width: 26,
    height: 26,
  },
});
