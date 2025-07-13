import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

type NotificationContent = {
  title: string;
  body: string;
};

export const scheduleNotification = async (content: NotificationContent) => {
  if (Platform.OS === 'web') {
    if ('Notification' in window) {
      if (Notification.permission === 'default') {
        await Notification.requestPermission();
      }

      if (Notification.permission === 'granted') {
        new Notification(content.title, {
          body: content.body,
          icon: '/favicon.ico',
        });
      }
    }
  } else {
    await Notifications.scheduleNotificationAsync({
      content,
      trigger: null,
    });
  }
};

export const requestNotificationPermissions = async () => {
  if (Platform.OS === 'web') {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return false;
  } else {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    return finalStatus === 'granted';
  }
};
