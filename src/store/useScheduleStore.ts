import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ScheduleEvent } from '@/features/time-blocking/types/schedule.types';
import { allocateStudySlots } from '@/features/time-blocking/utils/slotAllocator';
import { Task } from '@/features/task-engine/types/task.types';

interface ScheduleState {
  events: ScheduleEvent[];
  addFixedEvent: (event: Omit<ScheduleEvent, 'id' | 'type'>) => void;
  deleteEvent: (id: string) => void;
  autoAllocate: (tasks: Task[]) => void;
}

export const useScheduleStore = create<ScheduleState>()(
  persist(
    (set, get) => ({
      events: [
        {
          id: '1',
          title: 'Kuliah Pemrograman Web',
          start: new Date(new Date().setHours(9, 0, 0, 0)).toISOString(),
          end: new Date(new Date().setHours(11, 30, 0, 0)).toISOString(),
          type: 'FIXED',
          category: 'KULIAH',
        },
      ],

      addFixedEvent: (newEvent) => {
        set((state) => ({
          events: [...state.events, { ...newEvent, id: crypto.randomUUID(), type: 'FIXED' }],
        }));
      },

      deleteEvent: (id) => {
        set((state) => ({
          events: state.events.filter((e) => e.id !== id),
        }));
      },

      autoAllocate: (tasks) => {
        const fixedEvents = get().events.filter((e) => e.type === 'FIXED');
        const studyEvents = allocateStudySlots(tasks, fixedEvents);

        set({
          events: [...fixedEvents, ...studyEvents],
        });
      },
    }),
    {
      name: 'academic-schedule-storage', // Key unik di localStorage
    }
  )
);