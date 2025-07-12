import React, { createContext, useEffect, ReactNode } from 'react';
import { useTodoStore } from './store';
import { TodoState } from '../types/todo';

export const TodoContext = createContext<TodoState>({} as TodoState);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const todoStore = useTodoStore();
  const loadTasks = useTodoStore((state) => state.loadTasks);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  return <TodoContext.Provider value={todoStore}>{children}</TodoContext.Provider>;
};

export const useTodoContext = () => {
  const context = React.useContext(TodoContext);
  if (!context) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }
  return context;
};
