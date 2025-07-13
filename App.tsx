import './global.css';

import 'react-native-gesture-handler';
import 'react-native-reanimated';
import * as Notifications from 'expo-notifications';
import { TodoProvider } from './store/TodoContext';
import Navigation from './navigation';
import { useEffect } from 'react';

export default function App() {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });

  async function registerForPushNotificationsAsync() {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    const token = await Notifications.getExpoPushTokenAsync();
    console.log(token);
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
