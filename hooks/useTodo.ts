import { useTodoStore } from '../store/store';

// Direct hook to use Zustand store without context
export const useTodo = () => {
  return useTodoStore();
};

// Selective hooks for better performance
export const useTasks = () => useTodoStore(state => state.tasks);
export const useTaskActions = () => useTodoStore(state => ({
  addTask: state.addTask,
  toggleTask: state.toggleTask,
  clearCompleted: state.clearCompleted,
}));
