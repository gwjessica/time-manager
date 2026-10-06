'use client';

import React, { useState } from 'react';
import { useRebalancer } from '../hooks/useRebalancer';
import { AlertTriangle, RefreshCw, Calendar, CheckCircle2 } from 'lucide-react';

export const EmergencyScheduleModal: React.FC = () => {
  const { insertEmergencySchedule, lastRebalanceInfo, clearInfo } = useRebalancer();

  const [title, setTitle] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [category, setCategory] = useState<'KULIAH' | 'ORGANISASI' | 'PRIBADI'>('ORGANISASI');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !start || !end) return;

    insertEmergencySchedule({
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
    <div className="bg-amber-50/50 dark:bg-amber-950/10 border border-amber-200 dark:border-amber-900/50 rounded-xl p-5 shadow-sm space-y-4">
      <div className="flex items-center gap-2 text-amber-800 dark:text-amber-400">
        <AlertTriangle className="w-5 h-5" />
        <h3 className="font-semibold text-lg">One-Click Reschedule (Jadwal Mendadak)</h3>
      </div>

      <p className="text-xs text-amber-700/80 dark:text-amber-400/80">
        Ada rapat panitia atau dosen minta kelas pengganti mendadak? Masukkan di sini. AI akan mendistribusikan ulang blok waktu belajar yang tergeser secara otomatis.
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Nama Kegiatan Mendadak (misal: Rapat Darurat UKM)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-zinc-800 border-amber-300 dark:border-amber-800 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
        />

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs text-zinc-600 dark:text-zinc-400 mb-1">Mulai</label>
            <input
              type="datetime-local"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              className="w-full px-2 py-1.5 border rounded-lg bg-white dark:bg-zinc-800 border-amber-300 dark:border-amber-800 text-xs"
            />
          </div>
          <div>
            <label className="block text-xs text-zinc-600 dark:text-zinc-400 mb-1">Selesai</label>
            <input
              type="datetime-local"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              className="w-full px-2 py-1.5 border rounded-lg bg-white dark:bg-zinc-800 border-amber-300 dark:border-amber-800 text-xs"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-medium text-xs rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Sisipkan & Redistribusi Otomatis
        </button>
      </form>

      {/* Rebalance Feedback Notification */}
      {lastRebalanceInfo && (
        <div className="p-3 bg-emerald-100 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 rounded-lg text-xs space-y-1">
          <div className="flex items-center justify-between text-emerald-800 dark:text-emerald-300 font-semibold">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Redistribusi Berhasil!
            </span>
            <button onClick={clearInfo} className="text-zinc-400 hover:text-zinc-600">×</button>
          </div>
          {lastRebalanceInfo.shiftedCount > 0 ? (
            <p className="text-emerald-700 dark:text-emerald-400">
              {lastRebalanceInfo.shiftedCount} blok belajar tergeser dan berhasil dipindahkan ke celah kosong berikutnya.
            </p>
          ) : (
            <p className="text-emerald-700 dark:text-emerald-400">
              Tidak ada bentrokan dengan jadwal belajar yang sudah ada.
            </p>
          )}
        </div>
      )}
    </div>
  );
};