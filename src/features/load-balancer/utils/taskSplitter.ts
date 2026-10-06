import { ScheduleEvent } from '@/features/time-blocking/types/schedule.types';
import { DailyLoadMetrics, TaskChunk } from '../types/loadbalancer.types';
import { Task } from '@/features/task-engine/types/task.types';
import { format } from 'date-fns';

const DAILY_WORK_LIMIT_HOURS = 8; // Batas wajar produktivitas gabungan per hari (8 jam)

/**
 * Memecah tugas besar (> 2 jam) menjadi beberapa sesi kecil (misal: max 2 jam per sesi)
 */
export function splitTaskIntoChunks(task: Task, maxSessionHours: number = 2): TaskChunk[] {
  if (!task.isSplitable || task.estimatedHours <= maxSessionHours) {
    return [
      {
        taskId: task.id,
        chunkTitle: task.title,
        durationHours: task.estimatedHours,
        sessionIndex: 1,
        totalSessions: 1,
      },
    ];
  }

  const chunks: TaskChunk[] = [];
  let remainingHours = task.estimatedHours;
  let sessionIndex = 1;
  const totalSessions = Math.ceil(task.estimatedHours / maxSessionHours);

  while (remainingHours > 0) {
    const duration = Math.min(remainingHours, maxSessionHours);
    chunks.push({
      taskId: task.id,
      chunkTitle: `${task.title} (Sesi ${sessionIndex}/${totalSessions})`,
      durationHours: duration,
      sessionIndex,
      totalSessions,
    });
    remainingHours -= duration;
    sessionIndex++;
  }

  return chunks;
}

/**
 * Menghitung beban kerja harian dari daftar jadwal
 */
export function calculateDailyLoad(events: ScheduleEvent[], targetDate: Date = new Date()): DailyLoadMetrics {
  const dateStr = format(targetDate, 'yyyy-MM-dd');

  const dayEvents = events.filter((e) => {
    const eventDate = format(new Date(e.start), 'yyyy-MM-dd');
    return eventDate === dateStr;
  });

  let fixedMinutes = 0;
  let studyMinutes = 0;

  for (const event of dayEvents) {
    const durationMin = (new Date(event.end).getTime() - new Date(event.start).getTime()) / (1000 * 60);
    if (event.type === 'FIXED') {
      fixedMinutes += durationMin;
    } else {
      studyMinutes += durationMin;
    }
  }

  const fixedHours = Math.round((fixedMinutes / 60) * 10) / 10;
  const studyHours = Math.round((studyMinutes / 60) * 10) / 10;
  const totalHours = Math.round((fixedHours + studyHours) * 10) / 10;

  const capacityPercentage = Math.min(Math.round((totalHours / DAILY_WORK_LIMIT_HOURS) * 100), 150);

  let status: DailyLoadMetrics['status'] = 'SAFE';
  if (totalHours >= 10) {
    status = 'BURNOUT_RISK';
  } else if (totalHours >= 8) {
    status = 'WARNING';
  }

  return {
    date: dateStr,
    fixedHours,
    studyHours,
    totalHours,
    capacityPercentage,
    status,
  };
}