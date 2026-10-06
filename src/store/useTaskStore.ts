import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Task, TaskFormValues } from '@/features/task-engine/types/task.types';
import { sortTasksByPriority, calculatePriorityScore } from '@/features/task-engine/utils/priorityCalculator';

interface TaskState {
  tasks: Task[];
  addTask: (values: TaskFormValues) => void;
  deleteTask: (id: string) => void;
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set) => ({
      tasks: [],

      addTask: (values) => {
        const newTask: Task = {
          ...values,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          calculatedPriorityScore: calculatePriorityScore(values),
        };

        set((state) => ({
          tasks: sortTasksByPriority([...state.tasks, newTask]),
        }));
      },

      deleteTask: (id) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        }));
      },
    }),
    {
      name: 'academic-task-storage', // Key unik di localStorage
    }
  )
);