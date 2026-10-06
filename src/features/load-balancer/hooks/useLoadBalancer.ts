import { useScheduleStore } from '@/store/useScheduleStore';
import { calculateDailyLoad } from '../utils/taskSplitter';

export function useLoadBalancer(selectedDate: Date = new Date()) {
  const events = useScheduleStore((state) => state.events);
  const metrics = calculateDailyLoad(events, selectedDate);

  return {
    metrics,
    isBurnoutRisk: metrics.status === 'BURNOUT_RISK',
    isWarning: metrics.status === 'WARNING',
  };
}