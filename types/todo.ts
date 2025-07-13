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
};

export type TodoContextType = TodoState & {
  addTask: (text: string) => Promise<void>;
  toggleTask: (id: number) => Promise<void>;
  clearCompleted: () => Promise<void>;
  setTasks: (tasks: Task[]) => void;
  undo: () => void;
  redo: () => void;
};
