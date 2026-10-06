import { Task } from '@/features/task-engine/types/task.types';
import { ScheduleEvent, TimeRange } from '../types/schedule.types';
import { addMinutes, isBefore, isAfter, max, min, setHours, setMinutes } from 'date-fns';

/**
 * Mencari celah waktu kosong (Free Slots) di antara jadwal tetap
 */
export function findFreeSlots(
  fixedEvents: ScheduleEvent[],
  startDate: Date,
  daysToPlan: number = 7,
  dayStartHour: number = 8,  // Jam 08:00
  dayEndHour: number = 22    // Jam 22:00
): TimeRange[] {
  const freeSlots: TimeRange[] = [];

  for (let i = 0; i < daysToPlan; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(currentDate.getDate() + i);

    let windowStart = setMinutes(setHours(new Date(currentDate), dayStartHour), 0);
    const windowEnd = setMinutes(setHours(new Date(currentDate), dayEndHour), 0);

    // Ambil jadwal tetap pada hari yang sama dan urutkan berdasarkan waktu mulai
    const dayEvents = fixedEvents
      .filter((event) => {
        const evStart = new Date(event.start);
        return evStart.toDateString() === currentDate.toDateString();
      })
      .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());

    for (const event of dayEvents) {
      const evStart = new Date(event.start);
      const evEnd = new Date(event.end);

      // Jika ada celah antara windowStart dan awal acara
      if (isBefore(windowStart, evStart) && isBefore(windowStart, windowEnd)) {
        const slotEnd = min([evStart, windowEnd]);
        if (slotEnd.getTime() - windowStart.getTime() >= 30 * 60 * 1000) { // Minimal slot 30 menit
          freeSlots.push({ start: new Date(windowStart), end: slotEnd });
        }
      }
      windowStart = max([windowStart, evEnd]);
    }

    // Celah tersisa hingga batas jam malam
    if (isBefore(windowStart, windowEnd)) {
      if (windowEnd.getTime() - windowStart.getTime() >= 30 * 60 * 1000) {
        freeSlots.push({ start: new Date(windowStart), end: windowEnd });
      }
    }
  }

  return freeSlots;
}

/**
 * Mendistribusikan tugas-tugas prioritas ke dalam Free Slots
 */
export function allocateStudySlots(tasks: Task[], fixedEvents: ScheduleEvent[]): ScheduleEvent[] {
  const allocatedEvents: ScheduleEvent[] = [];
  const freeSlots = findFreeSlots(fixedEvents, new Date(), 7);

  // Filter tugas yang belum selesai dan urutkan berdasarkan skor prioritas
  const sortedTasks = [...tasks].sort(
    (a, b) => (b.calculatedPriorityScore || 0) - (a.calculatedPriorityScore || 0)
  );

  for (const task of sortedTasks) {
    let remainingMinutes = task.estimatedHours * 60;

    for (let i = 0; i < freeSlots.length && remainingMinutes > 0; i++) {
      const slot = freeSlots[i];
      const slotDuration = (slot.end.getTime() - slot.start.getTime()) / (1000 * 60);

      if (slotDuration <= 0) continue;

      // Alokasikan waktu pengerjaan (maksimal durasi slot atau sisa estimasi tugas)
      const durationToAllocate = Math.min(remainingMinutes, slotDuration);
      const allocStart = new Date(slot.start);
      const allocEnd = addMinutes(allocStart, durationToAllocate);

      allocatedEvents.push({
        id: crypto.randomUUID(),
        title: `[Belajar] ${task.title}`,
        start: allocStart.toISOString(),
        end: allocEnd.toISOString(),
        type: 'STUDY_ALLOCATED',
        relatedTaskId: task.id,
        category: task.category,
      });

      remainingMinutes -= durationToAllocate;

      // Update sisa waktu pada free slot tersebut
      slot.start = allocEnd;
    }
  }

  return allocatedEvents;
}