import { TaskInputForm } from '@/features/task-engine/components/TaskInputForm';
import { PriorityTaskList } from '@/features/task-engine/components/PriorityTaskList';
import { ScheduleMatrix } from '@/features/time-blocking/components/ScheduleMatrix';
import { FixedScheduleForm } from '@/features/time-blocking/components/FixedScheduleForm';
import { EmergencyScheduleModal } from '@/features/re-balancer/components/EmergencyScheduleModal';
import { DailyCapacityBar } from '@/features/load-balancer/components/DailyCapacityBar';

export default function DashboardPage() {
  return (
    <main className="max-w-7xl mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Intelligent Academic & Activity Time-Manager
        </h1>
        <p className="text-sm text-zinc-500">
          Sistem alokasi waktu pintar berbasis prioritas, re-balancing adaptif, dan pencegahan burnout.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Forms & Controls */}
        <div className="space-y-6">
          <DailyCapacityBar />
          <TaskInputForm />
          <FixedScheduleForm />
          <EmergencyScheduleModal />
        </div>

        {/* Right Column: Calendar Matrix & Priority List */}
        <div className="lg:col-span-2 space-y-6">
          <ScheduleMatrix />
          <PriorityTaskList />
        </div>
      </div>
    </main>
  );
}