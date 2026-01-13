import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { TimelineGroup as TimelineGroupType } from '../../types/timeline.types';
import { TimelineEventCard } from './TimelineEventCard';
import { useTimelineStore } from '../../store/timelineStore';

interface TimelineGroupProps {
  group: TimelineGroupType;
  isLast?: boolean;
}

export const TimelineGroup: React.FC<TimelineGroupProps> = ({ group, isLast }) => {
  const { expandedEvents, toggleEventExpansion } = useTimelineStore();

  const formatDateLabel = (dateStr: string, label: string) => {
    try {
      const date = new Date(dateStr);
      const dayMonth = format(date, 'MMM d');
      return label === 'Today' || label === 'Yesterday' || label === 'Previous' 
        ? label 
        : dayMonth;
    } catch {
      return label;
    }
  };

  return (
    <motion.div
      className="relative mb-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Date Header */}
      <div className="flex items-center mb-6 md:mb-8">
        <div className="hidden md:block w-[120px] text-right pr-6">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            {group.label}
          </span>
        </div>
        <div className="absolute left-0 md:relative md:left-auto flex items-center justify-center z-10">
          <div className="h-14 w-14 flex items-center justify-center rounded-full bg-slate-50 dark:bg-slate-900 border-4 border-white dark:border-slate-900">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded-full">
              {formatDateLabel(group.date, group.label)}
            </span>
          </div>
        </div>
      </div>

      {/* Events */}
      <div className="space-y-0">
        {group.events.map((event, index) => (
          <TimelineEventCard
            key={event.id}
            event={event}
            isExpanded={expandedEvents.has(event.id)}
            onToggleExpand={() => toggleEventExpansion(event.id)}
          />
        ))}
      </div>
    </motion.div>
  );
};