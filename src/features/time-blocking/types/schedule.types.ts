export type EventType = 'FIXED' | 'STUDY_ALLOCATED';

export interface ScheduleEvent {
  id: string;
  title: string;
  start: string; // ISO String
  end: string;   // ISO String
  type: EventType;
  relatedTaskId?: string;
  category?: 'KULIAH' | 'ORGANISASI' | 'PRIBADI';
}

export interface TimeRange {
  start: Date;
  end: Date;
}