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
import { useHistoryStore } from './historyStore';
import * as Haptics from 'expo-haptics';

export const TodoContext = createContext<TodoContextType>({} as TodoContextType);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { setPresent, undo, redo } = useHistoryStore();

  const loadTasks = useCallback(async () => {
    const loadedTasks = await loadTasksFromStorage();
    setTasks(loadedTasks);
    setPresent(loadedTasks);
  }, [setPresent]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const addTask = useCallback(
    async (text: string) => {
      const newTask = createTask(text);
      const updatedTasks = [...tasks, newTask];
      setPresent(updatedTasks);
      setTasks(updatedTasks);
      await saveTasksToStorage(updatedTasks);
      await sendTaskAddedNotification(text);
    },
    [tasks, setPresent]
  );

  const toggleTask = useCallback(
    async (id: number) => {
      const updatedTasks = toggleTaskCompletion(tasks, id);
      setPresent(updatedTasks);
      setTasks(updatedTasks);
      await saveTasksToStorage(updatedTasks);
      triggerHapticFeedback(Haptics.ImpactFeedbackStyle.Light);
    },
    [tasks, setPresent]
  );

  const clearCompleted = useCallback(async () => {
    const updatedTasks = filterCompletedTasks(tasks);
    setPresent(updatedTasks);
    setTasks(updatedTasks);
    await saveTasksToStorage(updatedTasks);
    triggerHapticFeedback(Haptics.NotificationFeedbackType.Success);
  }, [tasks, setPresent]);

  const handleUndo = useCallback(async () => {
    undo();
    // Get the updated present state after undo
    const historyStore = useHistoryStore.getState();
    const newTasks = historyStore.present;
    setTasks(newTasks);
    await saveTasksToStorage(newTasks);
  }, [undo]);

  const handleRedo = useCallback(async () => {
    redo();
    // Get the updated present state after redo
    const historyStore = useHistoryStore.getState();
    const newTasks = historyStore.present;
    setTasks(newTasks);
    await saveTasksToStorage(newTasks);
  }, [redo]);

  const contextValue = {
    tasks,
    addTask,
    toggleTask,
    clearCompleted,
    loadTasks,
    setTasks,
    undo: handleUndo,
    redo: handleRedo,
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
