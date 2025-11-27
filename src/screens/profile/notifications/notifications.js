import { View, StyleSheet, ToastAndroid } from 'react-native';
import React, { useState, useEffect } from 'react';
import Header from '../../../components/common/header/header';
import TextButton from '../../../components/common/textButton/textButton';
import notifee from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Notifications({ navigation }) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // Load saved state on mount
  useEffect(() => {
    const loadNotificationState = async () => {
      try {
        const savedState = await AsyncStorage.getItem('notificationsEnabled');
        if (savedState !== null) {
          setNotificationsEnabled(savedState === 'true');
        }
      } catch (error) {
        console.log('Error loading notification state:', error);
      }
    };
    loadNotificationState();
  }, []);

  // Toggle notifications and save state
  const toggleNotifications = async () => {
    const newState = !notificationsEnabled;
    setNotificationsEnabled(newState);

    try {
      await AsyncStorage.setItem('notificationsEnabled', newState.toString());
    } catch (error) {
      console.log('Error saving notification state:', error);
    }

    if (!newState) {
      // Disable notifications
      await notifee.cancelAllNotifications();
      ToastAndroid.show('Notifications disabled', 3000);
    } else {
      // Enable notifications
      ToastAndroid.show('Notifications enabled', 3000);
    }
  };

  return (
    <View style={styles.container}>
      <Header title={'Notifications'} navigation={navigation} />
      <View style={styles.wrapper}>
        <TextButton
          onPress={toggleNotifications}
          title={notificationsEnabled ? 'Disable Push Notifications' : 'Enable Push Notifications'}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    marginHorizontal: 16,
    borderRadius: 10,
    overflow: 'hidden',
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
});
