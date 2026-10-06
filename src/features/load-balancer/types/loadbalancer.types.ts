export interface DailyLoadMetrics {
  date: string; // Format: YYYY-MM-DD
  fixedHours: number;
  studyHours: number;
  totalHours: number;
  capacityPercentage: number; // Terhadap batas wajar (misal: 8 jam/hari)
  status: 'SAFE' | 'WARNING' | 'BURNOUT_RISK';
}

export interface TaskChunk {
  taskId: string;
  chunkTitle: string;
  durationHours: number;
  sessionIndex: number;
  totalSessions: number;
}