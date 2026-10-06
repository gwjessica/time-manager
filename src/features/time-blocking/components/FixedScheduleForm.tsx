'use client';

import React, { useState } from 'react';
import { useScheduleStore } from '@/store/useScheduleStore';
import { useTaskStore } from '@/store/useTaskStore';
import { CalendarPlus, Wand2 } from 'lucide-react';

export const FixedScheduleForm: React.FC = () => {
  const addFixedEvent = useScheduleStore((state) => state.addFixedEvent);
  const autoAllocate = useScheduleStore((state) => state.autoAllocate);
  const tasks = useTaskStore((state) => state.tasks);

  const [title, setTitle] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [category, setCategory] = useState<'KULIAH' | 'ORGANISASI' | 'PRIBADI'>('KULIAH');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !start || !end) return;

    addFixedEvent({
      title,
      start: new Date(start).toISOString(),
      end: new Date(end).toISOString(),
      category,
    });

    setTitle('');
    setStart('');
    setEnd('');
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm space-y-3">
        <h3 className="text-md font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <CalendarPlus className="w-4 h-4 text-blue-600" />
          Tambah Jadwal Tetap (Kuliah/Rapat)
        </h3>

        <input
          type="text"
          placeholder="Nama Kegiatan"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-1.5 border rounded-lg bg-zinc-50 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="grid grid-cols-2 gap-2">
          <input
            type="datetime-local"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            className="w-full px-2 py-1.5 border rounded-lg bg-zinc-50 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-xs"
          />
          <input
            type="datetime-local"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            className="w-full px-2 py-1.5 border rounded-lg bg-zinc-50 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-xs"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-colors"
        >
          Simpan Jadwal Tetap
        </button>
      </form>

      <button
        onClick={() => autoAllocate(tasks)}
        className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
      >
        <Wand2 className="w-4 h-4" />
        Auto Time-Block Free Slots
      </button>
    </div>
  );
};