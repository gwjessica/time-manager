import { ScheduleEvent } from '@/features/time-blocking/types/schedule.types';

export interface RebalanceResult {
  updatedEvents: ScheduleEvent[];
  shiftedCount: number;
  conflictedTaskTitles: string[];
}