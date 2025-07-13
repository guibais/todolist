import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import {
  createTask,
  toggleTaskCompletion,
  filterCompletedTasks,
  loadTasksFromStorage,
  saveTasksToStorage,
  sendTaskAddedNotification,
  triggerHapticFeedback,
} from './store';
import { Task, TodoContextType } from '../types/todo';
import * as Haptics from 'expo-haptics';

export const TodoContext = createContext<TodoContextType>({} as TodoContextType);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const loadTasks = useCallback(async () => {
    const loadedTasks = await loadTasksFromStorage();
    setTasks(loadedTasks);
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const addTask = useCallback(
    async (text: string) => {
      const newTask = createTask(text);
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      await saveTasksToStorage(updatedTasks);
      await sendTaskAddedNotification(text);
    },
    [tasks]
  );

  const toggleTask = useCallback(
    async (id: number) => {
      const updatedTasks = toggleTaskCompletion(tasks, id);
      setTasks(updatedTasks);
      await saveTasksToStorage(updatedTasks);
      triggerHapticFeedback(Haptics.ImpactFeedbackStyle.Light);
    },
    [tasks]
  );

  const clearCompleted = useCallback(async () => {
    const updatedTasks = filterCompletedTasks(tasks);
    setTasks(updatedTasks);
    await saveTasksToStorage(updatedTasks);
    triggerHapticFeedback(Haptics.NotificationFeedbackType.Success);
  }, [tasks]);

  const contextValue = {
    tasks,
    addTask,
    toggleTask,
    clearCompleted,
    loadTasks,
    setTasks,
  };

  return <TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>;
};

export const useTodoContext = () => {
  const context = React.useContext(TodoContext);
  if (!context) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }
  return context;
};
