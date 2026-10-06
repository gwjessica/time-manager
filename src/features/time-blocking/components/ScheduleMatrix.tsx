'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useScheduleStore } from '@/store/useScheduleStore';

// Dynamic import file wrapper terpisah (No SSR)
const CalendarWrapper = dynamic(
  () => import('./FullCalendarWrapper'),
  {
    ssr: false,
    loading: () => (
      <div className="h-[600px] w-full flex items-center justify-center bg-zinc-50 dark:bg-zinc-800/50 rounded-lg text-zinc-400 text-sm">
        Memuat Kalender...
      </div>
    ),
  }
);

export const ScheduleMatrix: React.FC = () => {
  const { events } = useScheduleStore();

  const formattedEvents = events.map((event) => ({
    id: event.id,
    title: event.title,
    start: event.start,
    end: event.end,
    backgroundColor: event.type === 'FIXED' ? '#3b82f6' : '#6366f1',
    borderColor: event.type === 'FIXED' ? '#1d4ed8' : '#4338ca',
    textColor: '#ffffff',
  }));

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm min-h-[650px]">
      <CalendarWrapper
        initialView="timeGridWeek"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'timeGridWeek,timeGridDay',
        }}
        slotMinTime="07:00:00"
        slotMaxTime="23:00:00"
        allDaySlot={false}
        events={formattedEvents}
        height="600px"
        nowIndicator={true}
      />
    </div>
  );
};