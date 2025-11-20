import { Platform } from 'react-native';
import notifee, { IOSAuthorizationStatus, AndroidImportance, AndroidAuthorizationStatus } from '@notifee/react-native';


/**
 * Sends a local notification
 * @param {Object} options
 * @param {string} options.title - Notification title
 * @param {string} options.body - Notification body
 * @param {string} [options.androidChannelId] - Optional custom Android channel
 */

export const requestAndroidPermission = async () => {
  const settings = await notifee.requestPermission();
  // console.log(settings)
  if (settings.authorizationStatus >= 1) {
    console.log('Notifications authorized on Android');
    return true;
  }
  return false;
};

export const sendNotification = async ({ title, body, androidChannelId }) => {
  try {
    // Request permissions (iOS & Android 13+)
    const settings = await notifee.requestPermission();

    if (
      (Platform.OS === 'ios' && settings.authorizationStatus < IOSAuthorizationStatus.AUTHORIZED) ||
      (Platform.OS === 'android' && settings.authorizationStatus === 0) // 0 = denied
    ) {
      console.warn('Notifications not authorized');
      return { success: false, message: 'Not authorized' };
    }

    // Create Android channel
    const channelId = androidChannelId || await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
    });

    // Display notification
    await notifee.displayNotification({
      title,
      body,
      android: {
        channelId,
        smallIcon: 'ic_launcher',
        sound: 'default',
        pressAction: { id: 'default' },
      },
    });


    return { success: true };
  } catch (error) {
    console.error('Notification error:', error);
    return { success: false, error };
  }
};




export const checkNotificationPermission = async () => {
  try {
    const settings = await notifee.getNotificationSettings();

    if (Platform.OS === 'ios') {
      // iOS
      return settings.authorizationStatus >= IOSAuthorizationStatus.AUTHORIZED;
    } else {
      // Android
      // settings.authorizationStatus: 0 = denied, 1 = authorized
      return settings.authorizationStatus === 1;
    }
  } catch (error) {
    console.error('Error checking notification permissions:', error);
    return false;
  }
};