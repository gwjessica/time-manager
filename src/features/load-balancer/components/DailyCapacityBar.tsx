'use client';

import React from 'react';
import { useLoadBalancer } from '../hooks/useLoadBalancer';
import { Flame, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const DailyCapacityBar: React.FC = () => {
  const { metrics, isBurnoutRisk, isWarning } = useLoadBalancer(new Date());

  const getBarColor = () => {
    if (isBurnoutRisk) return 'bg-rose-500';
    if (isWarning) return 'bg-amber-500';
    return 'bg-emerald-500';
  };

  const getBadgeStyle = () => {
    if (isBurnoutRisk) return 'bg-rose-100 text-rose-800 dark:bg-rose-950/40 dark:text-rose-400';
    if (isWarning) return 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400';
    return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400';
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-orange-500" />
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-md">
            Indikator Beban Kerja Hari Ini
          </h3>
        </div>

        <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${getBadgeStyle()}`}>
          {metrics.status === 'BURNOUT_RISK' && 'Risiko Burnout Tinggi'}
          {metrics.status === 'WARNING' && 'Kapasitas Penuh'}
          {metrics.status === 'SAFE' && 'Beban Kerja Seimbang'}
        </span>
      </div>

      {/* Progress Bar Container */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs text-zinc-600 dark:text-zinc-400 font-medium">
          <span>{metrics.totalHours} Jam Allocated (Batas Wajar: 8 Jam)</span>
          <span>{metrics.capacityPercentage}%</span>
        </div>

        <div className="w-full h-3 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${getBarColor()}`}
            style={{ width: `${Math.min(metrics.capacityPercentage, 100)}%` }}
          />
        </div>
      </div>

      {/* Breakdown Detail */}
      <div className="grid grid-cols-2 gap-2 text-xs pt-1">
        <div className="p-2.5 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg">
          <span className="text-zinc-500 dark:text-zinc-400 block">Jadwal Tetap (Kuliah/Rapat)</span>
          <span className="font-bold text-zinc-800 dark:text-zinc-200 text-sm">
            {metrics.fixedHours} Jam
          </span>
        </div>
        <div className="p-2.5 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg">
          <span className="text-zinc-500 dark:text-zinc-400 block">Slot Belajar Mandiri</span>
          <span className="font-bold text-indigo-600 dark:text-indigo-400 text-sm">
            {metrics.studyHours} Jam
          </span>
        </div>
      </div>

      {/* Warning Banner Banner if Overworked */}
      {isBurnoutRisk && (
        <div className="p-3 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 rounded-lg flex items-start gap-2 text-xs text-rose-800 dark:text-rose-300">
          <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Peringatan overworking!</p>
            <p className="text-rose-700/80 dark:text-rose-400/80 mt-0.5">
              Total kegiatan hari ini melebihi 10 jam. Pertimbangkan untuk memecah tugas besar menjadi beberapa sesi menggunakan fitur <strong>Task Splitting</strong>.
            </p>
          </div>
        </div>
      )}

      {metrics.status === 'SAFE' && (
        <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 rounded-lg flex items-center gap-2 text-xs text-emerald-800 dark:text-emerald-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Alokasi waktu hari ini berada dalam kondisi ideal dan sehat.</span>
        </div>
      )}
    </div>
  );
};