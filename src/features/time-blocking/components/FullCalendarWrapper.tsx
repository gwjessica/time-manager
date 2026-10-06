'use client';

import React, { useEffect, useRef } from 'react';
import { Calendar } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

interface FullCalendarWrapperProps {
  events: Array<{
    id: string;
    title: string;
    start: string;
    end: string;
    backgroundColor?: string;
    borderColor?: string;
    textColor?: string;
  }>;
}

export default function FullCalendarWrapper({ events }: FullCalendarWrapperProps) {
  const calendarRef = useRef<HTMLDivElement>(null);
  const calendarInstanceRef = useRef<Calendar | null>(null);

  useEffect(() => {
    if (!calendarRef.current) return;

    // Render FullCalendar murni di DOM tanpa lewat wrapper React-nya
    const calendar = new Calendar(calendarRef.current, {
      plugins: [timeGridPlugin, dayGridPlugin, interactionPlugin],
      initialView: 'timeGridWeek',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'timeGridWeek,timeGridDay',
      },
      slotMinTime: '07:00:00',
      slotMaxTime: '23:00:00',
      allDaySlot: false,
      events: events,
      height: '600px',
      nowIndicator: true,
    });

    calendar.render();
    calendarInstanceRef.current = calendar;

    return () => {
      calendar.destroy();
    };
  }, []);

  // Sync event baru ketika state events berubah
  useEffect(() => {
    if (calendarInstanceRef.current) {
      calendarInstanceRef.current.removeAllEvents();
      events.forEach((event) => calendarInstanceRef.current?.addEvent(event));
    }
  }, [events]);

  return <div ref={calendarRef} className="w-full" />;
}