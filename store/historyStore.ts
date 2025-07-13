import { create } from 'zustand';
import { Task } from '../types/todo';

interface HistoryState {
  past: Task[][];
  present: Task[];
  future: Task[][];
  setPresent: (tasks: Task[]) => void;
  undo: () => void;
  redo: () => void;
}

export const useHistoryStore = create<HistoryState>((set, get) => ({
  past: [],
  present: [],
  future: [],
  setPresent: (tasks: Task[]) => {
    const { present, past } = get();
    set({
      past: [...past, present],
      present: tasks,
      future: [],
    });
  },
  undo: () => {
    const { past, present, future } = get();
    if (past.length === 0) return;

    const previous = past[past.length - 1];
    const newPast = past.slice(0, past.length - 1);

    set({
      past: newPast,
      present: previous,
      future: [present, ...future],
    });
  },
  redo: () => {
    const { past, present, future } = get();
    if (future.length === 0) return;

    const next = future[0];
    const newFuture = future.slice(1);

    set({
      past: [...past, present],
      present: next,
      future: newFuture,
    });
  },
}));
