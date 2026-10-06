import { Task } from '../types/task.types';

/**
 * Menghitung Priority Score untuk sebuah tugas
 * Skor lebih tinggi = Harus dikerjakan lebih dulu
 */
export function calculatePriorityScore(
  task: Pick<Task, 'deadline' | 'academicWeight' | 'cognitiveLoad' | 'estimatedHours'>
): number {
  const now = new Date().getTime();
  const deadlineTime = new Date(task.deadline).getTime();
  
  // Sisa waktu ke deadline dalam satuan jam
  const hoursLeft = Math.max((deadlineTime - now) / (1000 * 60 * 60), 0.5);

  // 1. Time Urgency Factor (Exponential Decay: semakin dekat deadline, skor melonjak naik)
  // Urgensi maksimum saat mendekati 0 jam
  const timeUrgencyScore = 100 / Math.pow(hoursLeft, 0.6);

  // 2. Importance Score (Academic Weight: 1-5 -> Skala 0-100)
  const importanceScore = (task.academicWeight / 5) * 100;

  // 3. Cognitive Load Factor (Kombinasi beban mental & durasi jam pengerjaan)
  const effortScore = (task.cognitiveLoad / 5) * 40 + Math.min(task.estimatedHours * 10, 60);

  // Weighted Combination Formula:
  // Priority = (45% Time Urgency) + (35% Importance) + (20% Effort Load)
  const finalScore = (timeUrgencyScore * 0.45) + (importanceScore * 0.35) + (effortScore * 0.20);

  return Math.round(finalScore * 10) / 10;
}

/**
 * Mengurutkan daftar tugas berdasarkan skor prioritas tertinggi ke terendah
 */
export function sortTasksByPriority(tasks: Task[]): Task[] {
  return [...tasks].map((task) => ({
    ...task,
    calculatedPriorityScore: calculatePriorityScore(task),
  })).sort((a, b) => (b.calculatedPriorityScore || 0) - (a.calculatedPriorityScore || 0));
}