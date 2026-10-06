'use client';

import React from 'react';

interface DifficultyBadgeProps {
  cognitiveLoad: number;
}

export const DifficultyBadge: React.FC<DifficultyBadgeProps> = ({ cognitiveLoad }) => {
  const getBadgeStyle = (load: number) => {
    if (load <= 2) return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400';
    if (load <= 3) return 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400';
    return 'bg-rose-100 text-rose-800 dark:bg-rose-950/40 dark:text-rose-400';
  };

  return (
    <span className={`text-xs px-2 py-0.5 rounded-md font-medium ${getBadgeStyle(cognitiveLoad)}`}>
      Cognitive Load: {cognitiveLoad}/5
    </span>
  );
};