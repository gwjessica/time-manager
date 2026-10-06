'use client';

import React from 'react';
import { useTaskStore } from '@/store/useTaskStore';
import { DifficultyBadge } from './DifficultyBadge';
import { Trash2, Clock, Calendar, AlertCircle } from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';
import { id } from 'date-fns/locale';

export const PriorityTaskList: React.FC = () => {
  const { tasks, deleteTask } = useTaskStore();

  if (tasks.length === 0) {
    return (
      <div className="p-8 text-center border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl">
        <AlertCircle className="w-8 h-8 text-zinc-400 mx-auto mb-2" />
        <p className="text-zinc-500 text-sm">Belum ada tugas yang dimasukkan.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
        Daftar Prioritas Pengerjaan (Auto-Sorted)
      </h3>

      {tasks.map((task, index) => {
        const isHighPriority = index === 0;

        return (
          <div
            key={task.id}
            className={`p-4 border rounded-xl flex items-center justify-between gap-4 transition-all ${
              isHighPriority
                ? 'border-indigo-500 bg-indigo-50/30 dark:bg-indigo-950/20 shadow-sm'
                : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900'
            }`}
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                  #{index + 1}
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-medium">
                  {task.category}
                </span>
                <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">{task.title}</h4>
              </div>

              <div className="flex items-center gap-4 text-xs text-zinc-500 dark:text-zinc-400 pt-1">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {format(new Date(task.deadline), 'dd MMM yyyy HH:mm', { locale: id })}
                  <span className="text-indigo-600 font-medium">
                    ({formatDistanceToNow(new Date(task.deadline), { locale: id, addSuffix: true })})
                  </span>
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {task.estimatedHours} Jam
                </span>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <DifficultyBadge cognitiveLoad={task.cognitiveLoad} />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-xs text-zinc-500">Score Prioritas</div>
                <div className="text-xl font-black text-indigo-600 dark:text-indigo-400">
                  {task.calculatedPriorityScore}
                </div>
              </div>

              <button
                onClick={() => deleteTask(task.id)}
                className="p-2 text-zinc-400 hover:text-red-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};