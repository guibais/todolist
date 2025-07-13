import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '../types/todo';
import * as Notifications from 'expo-notifications';
import * as Haptics from 'expo-haptics';

export const STORAGE_KEY = '@todolist:tasks';

export const createTask = (text: string): Task => ({
  id: Date.now(),
  text,
  completed: false,
});

export const toggleTaskCompletion = (tasks: Task[], id: number): Task[] =>
  tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task));

export const filterCompletedTasks = (tasks: Task[]): Task[] =>
  tasks.filter((task) => !task.completed);

export const loadTasksFromStorage = async (): Promise<Task[]> => {
  try {
    const storedTasks = await AsyncStorage.getItem(STORAGE_KEY);
    return storedTasks ? JSON.parse(storedTasks) : [];
  } catch (error) {
    console.error('Error loading tasks from storage:', error);
    return [];
  }
};

export const saveTasksToStorage = async (tasks: Task[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Error saving tasks to storage:', error);
  }
};

export const sendTaskAddedNotification = (text: string) => {
  Notifications.scheduleNotificationAsync({
    content: {
      title: 'Tarefa Adicionada!',
      body: `'${text}' foi adicionada à sua lista.`,
    },
    trigger: null, // Show immediately
  });
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
};

export const triggerHapticFeedback = (type: Haptics.NotificationFeedbackType | Haptics.ImpactFeedbackStyle) => {
  if (type === Haptics.NotificationFeedbackType.Success || type === Haptics.NotificationFeedbackType.Warning || type === Haptics.NotificationFeedbackType.Error) {
    Haptics.notificationAsync(type);
  } else {
    Haptics.impactAsync(type);
  }
};