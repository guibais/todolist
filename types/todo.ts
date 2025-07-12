export type Task = {
  id: number;
  text: string;
  completed: boolean;
};

export type TodoState = {
  tasks: Task[];
  addTask: (text: string) => void;
  toggleTask: (id: number) => void;
  clearCompleted: () => void;
  loadTasks: () => Promise<void>;
  saveTasks: () => Promise<void>;
};
