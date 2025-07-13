import './global.css';

import 'react-native-gesture-handler';
import 'react-native-reanimated';
import * as Notifications from 'expo-notifications';
import { TodoProvider } from './store/TodoContext';
import Navigation from './navigation';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import { requestNotificationPermissions } from './utils/notifications';

export default function App() {
  if (Platform.OS !== 'web') {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldPlaySound: false,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
      }),
    });
  }

  async function registerForPushNotificationsAsync() {
    const granted = await requestNotificationPermissions();

    if (!granted) {
      alert('Failed to get permission for notifications!');
      return;
    }

    if (Platform.OS !== 'web') {
      try {
        const token = await Notifications.getExpoPushTokenAsync();
        console.log('Push token:', token);
      } catch (error) {
        console.log('Error getting push token:', error);
      }
    }
  }

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  return (
    <TodoProvider>
      <Navigation />
    </TodoProvider>
  );
}
