'use client';

import React from 'react';
import { GraduationCap, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-indigo-600 rounded-lg text-white">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-zinc-900 dark:text-zinc-100 text-md leading-tight flex items-center gap-1.5">
              TimeManager AI
              <span className="text-[10px] bg-indigo-100 text-indigo-700 font-semibold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                <Sparkles className="w-2.5 h-2.5" /> v1.0
              </span>
            </h1>
            <p className="text-xs text-zinc-500">Academic & Activity Time-Manager</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-400 px-2.5 py-1 rounded-full font-medium">
            Status: Active
          </span>
        </div>
      </div>
    </header>
  );
};