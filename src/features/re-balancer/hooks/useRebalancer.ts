import { useScheduleStore } from '@/store/useScheduleStore';
import { ScheduleEvent } from '@/features/time-blocking/types/schedule.types';
import { rebalanceSchedule } from '../utils/redistributionAlgorithm';
import { useState } from 'react';

export function useRebalancer() {
  const events = useScheduleStore((state) => state.events);
  const setEvents = useScheduleStore.setState;

  const [lastRebalanceInfo, setLastRebalanceInfo] = useState<{
    shiftedCount: number;
    conflictedTaskTitles: string[];
  } | null>(null);

  const insertEmergencySchedule = (newEvent: Omit<ScheduleEvent, 'id' | 'type'>) => {
    const fixedEvent: ScheduleEvent = {
      ...newEvent,
      id: crypto.randomUUID(),
      type: 'FIXED',
    };

    const result = rebalanceSchedule(events, fixedEvent);

    // Update state global kalender
    setEvents({ events: result.updatedEvents });

    setLastRebalanceInfo({
      shiftedCount: result.shiftedCount,
      conflictedTaskTitles: result.conflictedTaskTitles,
    });

    return result;
  };

  return {
    insertEmergencySchedule,
    lastRebalanceInfo,
    clearInfo: () => setLastRebalanceInfo(null),
  };
}