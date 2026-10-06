'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { taskFormSchema, TaskFormValues } from '../types/task.types';
import { useTaskStore } from '@/store/useTaskStore';
import { PlusCircle } from 'lucide-react';

export const TaskInputForm: React.FC = () => {
  const addTask = useTaskStore((state) => state.addTask);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      category: 'KULIAH',
      academicWeight: 3,
      cognitiveLoad: 3,
      estimatedHours: 2,
      isSplitable: true,
    },
  });

  const onSubmit = (data: TaskFormValues) => {
    addTask(data);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-4"
    >
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
        <PlusCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        Tambah Tugas Baru
      </h3>

      {/* Title & Category */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            Nama Tugas / Kegiatan
          </label>
          <input
            {...register('title')}
            type="text"
            placeholder="Contoh: Laporan Praktikum Modul 2"
            className="w-full px-3 py-2 border rounded-lg bg-zinc-50 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            Kategori
          </label>
          <select
            {...register('category')}
            className="w-full px-3 py-2 border rounded-lg bg-zinc-50 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="KULIAH">Kuliah</option>
            <option value="ORGANISASI">Organisasi</option>
            <option value="PRIBADI">Pribadi</option>
          </select>
        </div>
      </div>

      {/* Deadline & Estimated Hours */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            Tenggat Waktu (Deadline)
          </label>
          <input
            {...register('deadline')}
            type="datetime-local"
            className="w-full px-3 py-2 border rounded-lg bg-zinc-50 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.deadline && <p className="text-xs text-red-500 mt-1">{errors.deadline.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            Estimasi Waktu Pengerjaan (Jam)
          </label>
          <input
            {...register('estimatedHours', { valueAsNumber: true })}
            type="number"
            step="0.5"
            className="w-full px-3 py-2 border rounded-lg bg-zinc-50 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.estimatedHours && <p className="text-xs text-red-500 mt-1">{errors.estimatedHours.message}</p>}
        </div>
      </div>

      {/* Academic Weight & Cognitive Load */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            Bobot Nilai / Urgensi (1 - 5)
          </label>
          <input
            {...register('academicWeight', { valueAsNumber: true })}
            type="range"
            min="1"
            max="5"
            className="w-full accent-indigo-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            Tingkat Kesulitan / Cognitive Load (1 - 5)
          </label>
          <input
            {...register('cognitiveLoad', { valueAsNumber: true })}
            type="range"
            min="1"
            max="5"
            className="w-full accent-indigo-600"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 pt-2">
        <input
          {...register('isSplitable')}
          type="checkbox"
          id="isSplitable"
          className="w-4 h-4 text-indigo-600 border-zinc-300 rounded focus:ring-indigo-500"
        />
        <label htmlFor="isSplitable" className="text-sm text-zinc-600 dark:text-zinc-400">
          Boleh dipecah menjadi beberapa sesi pengerjaan (Auto Task-Split)
        </label>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full mt-3 py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors focus:ring-2 focus:ring-indigo-500"
      >
        Hitung Prioritas & Simpan Tugas
      </button>
    </form>
  );
};