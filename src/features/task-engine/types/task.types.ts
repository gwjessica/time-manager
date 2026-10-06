import { z } from 'zod';

export type Category = 'KULIAH' | 'ORGANISASI' | 'PRIBADI';

export const CategoryEnum = z.enum(['KULIAH', 'ORGANISASI', 'PRIBADI']);

export interface Task {
  id: string;
  title: string;
  deadline: string; // ISO string format
  category: Category;
  academicWeight: number; // 1 - 5 (seberapa besar dampaknya terhadap nilai)
  estimatedHours: number; // estimasi total durasi pengerjaan (jam)
  cognitiveLoad: number;  // 1 - 5 (tingkat kesulitan/beban mental)
  calculatedPriorityScore?: number;
  isSplitable: boolean;
  createdAt: string;
}

// Zod Schema untuk Form Validation
export const taskFormSchema = z.object({
  title: z.string().min(3, { message: 'Judul tugas minimal 3 karakter' }),
  deadline: z.string().min(1, { message: 'Tenggat waktu wajib diisi' }),
  category: CategoryEnum,
  academicWeight: z.number().min(1).max(5),
  estimatedHours: z.number().min(0.5, { message: 'Minimal durasi 0.5 jam (30 menit)' }),
  cognitiveLoad: z.number().min(1).max(5),
  isSplitable: z.boolean().default(true),
});

export type TaskFormValues = z.infer<typeof taskFormSchema>;