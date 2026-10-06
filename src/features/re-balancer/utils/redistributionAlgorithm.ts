import { ScheduleEvent } from '@/features/time-blocking/types/schedule.types';
import { findFreeSlots } from '@/features/time-blocking/utils/slotAllocator';
import { RebalanceResult } from '../types/rebalancer.types';
import { addMinutes, isBefore, areIntervalsOverlapping } from 'date-fns';

/**
 * Mendeteksi bentrokan jadwal dan memindahkan slot pengerjaan tugas secara otomatis
 */
export function rebalanceSchedule(
  allEvents: ScheduleEvent[],
  newFixedEvent: ScheduleEvent
): RebalanceResult {
  // 1. Masukkan jadwal tetap baru ke dalam daftar
  const currentEvents = [...allEvents, newFixedEvent];

  // Separate Fixed and Study events
  const fixedEvents = currentEvents.filter((e) => e.type === 'FIXED');
  const studyEvents = currentEvents.filter((e) => e.type === 'STUDY_ALLOCATED');

  const shiftedTaskTitles: Set<string> = new Set();
  const validStudyEvents: ScheduleEvent[] = [];
  let totalShifted = 0;

  // 2. Filter blok pengerjaan tugas yang tumpang tindih dengan jadwal tetap yang baru
  for (const studySlot of studyEvents) {
    const isOverlapping = areIntervalsOverlapping(
      { start: new Date(studySlot.start), end: new Date(studySlot.end) },
      { start: new Date(newFixedEvent.start), end: new Date(newFixedEvent.end) }
    );

    if (isOverlapping) {
      shiftedTaskTitles.add(studySlot.title);
      totalShifted++;
    } else {
      validStudyEvents.push(studySlot);
    }
  }

  // Jika tidak ada bentrokan, kembalikan jadwal tanpa perubahan
  if (totalShifted === 0) {
    return {
      updatedEvents: currentEvents,
      shiftedCount: 0,
      conflictedTaskTitles: [],
    };
  }

  // 3. Cari Free Slots baru setelah penambahan jadwal tetap baru
  const freeSlots = findFreeSlots(fixedEvents, new Date(), 7);

  // 4. Redistribusikan jam belajar yang tergeser
  const redistributedEvents: ScheduleEvent[] = [];

  for (const studySlot of studyEvents) {
    const isOverlapping = areIntervalsOverlapping(
      { start: new Date(studySlot.start), end: new Date(studySlot.end) },
      { start: new Date(newFixedEvent.start), end: new Date(newFixedEvent.end) }
    );

    if (!isOverlapping) continue;

    const durationMinutes =
      (new Date(studySlot.end).getTime() - new Date(studySlot.start).getTime()) / (1000 * 60);

    let remainingMinutes = durationMinutes;

    for (let i = 0; i < freeSlots.length && remainingMinutes > 0; i++) {
      const slot = freeSlots[i];
      const slotDuration = (slot.end.getTime() - slot.start.getTime()) / (1000 * 60);

      if (slotDuration <= 0) continue;

      const durationToAllocate = Math.min(remainingMinutes, slotDuration);
      const allocStart = new Date(slot.start);
      const allocEnd = addMinutes(allocStart, durationToAllocate);

      redistributedEvents.push({
        ...studySlot,
        id: crypto.randomUUID(),
        start: allocStart.toISOString(),
        end: allocEnd.toISOString(),
      });

      remainingMinutes -= durationToAllocate;
      slot.start = allocEnd;
    }
  }

  return {
    updatedEvents: [...fixedEvents, ...validStudyEvents, ...redistributedEvents],
    shiftedCount: totalShifted,
    conflictedTaskTitles: Array.from(shiftedTaskTitles),
  };
}