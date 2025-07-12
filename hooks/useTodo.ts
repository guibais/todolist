import { useTodoStore } from '../store/store';

export const useTodo = () => {
  return useTodoStore();
};

export const useTasks = () => useTodoStore((state) => state.tasks);
export const useTaskActions = () =>
  useTodoStore((state) => ({
    addTask: state.addTask,
    toggleTask: state.toggleTask,
    clearCompleted: state.clearCompleted,
  }));
