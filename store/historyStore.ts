import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '../types/todo';

type HistoryState = {
  past: Task[][];
  present: Task[];
  future: Task[][];
  setPresent: (tasks: Task[]) => void;
  initializePresent: (tasks: Task[]) => void;
  undo: () => void;
  redo: () => void;
};

export const useHistoryStore = create<HistoryState>()(
  persist(
    (set, get) => ({
      past: [],
      present: [],
      future: [],
      setPresent: (tasks: Task[]) => {
        const { present, past } = get();
        if (present.length > 0) {
          set({
            past: [...past, present],
            present: tasks,
            future: [],
          });
        } else {
          set({ present: tasks });
        }
      },
      initializePresent: (tasks: Task[]) => {
        set({ present: tasks });
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
    }),
    {
      name: 'history-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
