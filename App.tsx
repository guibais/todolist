import './global.css';

import 'react-native-gesture-handler';
import 'react-native-reanimated';
import * as Notifications from 'expo-notifications';
import { TodoProvider, useTodoContext } from './store/TodoContext';
import Navigation from './navigation';
import { useEffect } from 'react';
import { useHistoryStore } from './store/historyStore';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
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
      <AppContent />
    </TodoProvider>
  );
}

function AppContent() {
  const { tasks, setTasks } = useTodoContext();
  const { present, setPresent, undo, redo } = useHistoryStore();

  // Effect to push current tasks to history when they change
  useEffect(() => {
    if (JSON.stringify(tasks) !== JSON.stringify(present)) {
      setPresent(tasks);
    }
  }, [tasks]);

  // Effect to update TodoContext when history's present changes (undo/redo)
  useEffect(() => {
    if (JSON.stringify(tasks) !== JSON.stringify(present)) {
      setTasks(present);
    }
  }, [present]);

  return (
    <View style={{ flex: 1 }}>
      <Navigation />
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 10 }}>
        <TouchableOpacity onPress={undo} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#DDDDDD', padding: 10, borderRadius: 5 }}>
          <Ionicons name="arrow-undo" size={24} color="black" />
          <Text style={{ marginLeft: 5 }}>Desfazer</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={redo} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#DDDDDD', padding: 10, borderRadius: 5 }}>
          <Ionicons name="arrow-redo" size={24} color="black" />
          <Text style={{ marginLeft: 5 }}>Refazer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
