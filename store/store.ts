import { create } from 'zustand';
import * as Notifications from 'expo-notifications';
import * as Haptics from 'expo-haptics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task, TodoState } from '../types/todo';

const STORAGE_KEY = '@todolist:tasks';

const taskActions = {
  addTask: (text: string) => ({
    id: Date.now(),
    text,
    completed: false,
  }),

  toggleTaskCompletion: (tasks: Task[], id: number) =>
    tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)),

  filterCompletedTasks: (tasks: Task[]) => tasks.filter((task) => !task.completed),
};

export const useTodoStore = create<TodoState>((set, get) => ({
  tasks: [],

  addTask: async (text: string) => {
    const newTask = taskActions.addTask(text);
    const updatedTasks = [...get().tasks, newTask];
    set({ tasks: updatedTasks });
    await get().saveTasks();

    Notifications.scheduleNotificationAsync({
      content: {
        title: 'Tarefa Adicionada!',
        body: `'${text}' foi adicionada à sua lista.`,
      },
      trigger: null,
    });
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  },

  toggleTask: async (id: number) => {
    const updatedTasks = taskActions.toggleTaskCompletion(get().tasks, id);
    set({ tasks: updatedTasks });
    await get().saveTasks();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Notifications.scheduleNotificationAsync({
      content: {
        title: 'Tarefa Concluída!',
        body: `'${get().tasks.find((task) => task.id === id)?.text}' foi concluída.`,
      },
      trigger: null,
    });
  },

  clearCompleted: async () => {
    const updatedTasks = taskActions.filterCompletedTasks(get().tasks);
    set({ tasks: updatedTasks });
    await get().saveTasks();
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Notifications.scheduleNotificationAsync({
      content: {
        title: 'Tarefas Removidas!',
        body: 'Todas as tarefas concluídas foram removidas.',
      },
      trigger: null,
    });
  },

  loadTasks: async () => {
    try {
      const storedTasks = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedTasks) {
        const tasks = JSON.parse(storedTasks);
        set({ tasks });
      }
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  },

  saveTasks: async () => {
    try {
      const { tasks } = get();
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  },
}));
