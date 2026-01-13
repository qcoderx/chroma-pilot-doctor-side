import React from 'react';
import { motion } from 'framer-motion';
import { 
  AlertTriangle, 
  Activity, 
  FileText, 
  Dna, 
  Upload, 
  UserPlus,
  Pill,
  Calendar,
  ArrowRight,
  Download,
  FileCheck
} from 'lucide-react';
import { TimelineEvent } from '../../types/timeline.types';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface TimelineEventCardProps {
  event: TimelineEvent;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
}

const eventIcons = {
  alert: AlertTriangle,
  telemetry: Activity,
  phenotype: FileText,
  genome: Dna,
  upload: Upload,
  created: UserPlus,
  medication: Pill,
  appointment: Calendar
};

const eventColors = {
  alert: {
    bg: 'bg-amber-50 dark:bg-amber-900/20',
    border: 'border-amber-200 dark:border-amber-800',
    icon: 'text-amber-600 dark:text-amber-500',
    card: 'border-amber-200 dark:border-amber-900/50'
  },
  telemetry: {
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    border: 'border-blue-200 dark:border-blue-800',
    icon: 'text-blue-600 dark:text-blue-500',
    card: 'border-slate-200 dark:border-slate-700'
  },
  phenotype: {
    bg: 'bg-teal-50 dark:bg-teal-900/20',
    border: 'border-teal-200 dark:border-teal-800',
    icon: 'text-teal-600 dark:text-teal-400',
    card: 'border-slate-200 dark:border-slate-700'
  },
  genome: {
    bg: 'bg-purple-50 dark:bg-purple-900/20',
    border: 'border-purple-200 dark:border-purple-800',
    icon: 'text-purple-600 dark:text-purple-400',
    card: 'border-slate-200 dark:border-slate-700'
  },
  upload: {
    bg: 'bg-slate-100 dark:bg-slate-800',
    border: 'border-slate-200 dark:border-slate-700',
    icon: 'text-slate-500',
    card: 'border-slate-200 dark:border-slate-700'
  },
  created: {
    bg: 'bg-green-50 dark:bg-green-900/20',
    border: 'border-green-200 dark:border-green-800',
    icon: 'text-green-600 dark:text-green-400',
    card: 'border-slate-200 dark:border-slate-700'
  },
  medication: {
    bg: 'bg-indigo-50 dark:bg-indigo-900/20',
    border: 'border-indigo-200 dark:border-indigo-800',
    icon: 'text-indigo-600 dark:text-indigo-400',
    card: 'border-slate-200 dark:border-slate-700'
  },
  appointment: {
    bg: 'bg-emerald-50 dark:bg-emerald-900/20',
    border: 'border-emerald-200 dark:border-emerald-800',
    icon: 'text-emerald-600 dark:text-emerald-400',
    card: 'border-slate-200 dark:border-slate-700'
  }
};

const priorityColors = {
  critical: 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400',
  high: 'bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-400',
  medium: 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-400',
  low: 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400'
};

const statusColors = {
  success: 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400',
  warning: 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400',
  error: 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400',
  info: 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
};

export const TimelineEventCard: React.FC<TimelineEventCardProps> = ({
  event,
  isExpanded,
  onToggleExpand
}) => {
  const Icon = eventIcons[event.type];
  const colors = eventColors[event.type];

  return (
    <motion.div
      className="relative flex flex-col md:flex-row gap-4 md:gap-0 mb-8 group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Timestamp Column */}
      <div className="md:w-[120px] md:text-right md:pr-8 md:pt-3 pl-12 md:pl-0">
        <span className="text-sm font-medium text-slate-500 dark:text-slate-400 tabular-nums">
          {event.timestamp}
        </span>
      </div>

      {/* Icon Column */}
      <div className="absolute left-0 md:relative md:left-auto flex justify-center md:w-[60px] pt-1 z-10">
        <motion.div
          className={`h-14 w-14 rounded-full ${colors.bg} ${colors.border} border flex items-center justify-center shadow-sm`}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
        >
          <Icon className={`w-5 h-5 ${colors.icon}`} />
        </motion.div>
      </div>

      {/* Content Column */}
      <div className="flex-1 md:pl-6 pl-12">
        <motion.div
          className={`bg-white dark:bg-slate-800 border ${colors.card} rounded-lg p-4 shadow-sm relative hover:shadow-md transition-shadow`}
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
        >
          {/* Speech bubble arrow */}
          <div className={`absolute left-0 top-6 -ml-[7px] w-3 h-3 bg-white dark:bg-slate-800 border-b border-l ${colors.card} transform rotate-45 hidden md:block`} />
          
          <div className="flex justify-between items-start mb-2">
            <h4 className="text-base font-semibold text-slate-900 dark:text-white">
              {event.title}
            </h4>
            <div className="flex gap-2">
              {event.priority && (
                <Badge className={`text-xs px-2 py-0.5 rounded-full font-medium ${priorityColors[event.priority]}`}>
                  {event.priority.charAt(0).toUpperCase() + event.priority.slice(1)}
                </Badge>
              )}
              {event.status && !event.priority && (
                <Badge className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[event.status]}`}>
                  {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                </Badge>
              )}
            </div>
          </div>

          <p className="text-slate-600 dark:text-slate-300 text-sm mb-3">
            {event.description}
            {event.metadata?.gene && (
              <span className="font-mono bg-slate-100 dark:bg-slate-700 px-1 rounded text-slate-800 dark:text-slate-200 ml-1">
                {event.metadata.gene}
              </span>
            )}
            {event.metadata?.filename && (
              <code className="text-xs bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded px-1 py-0.5 font-mono ml-1">
                {event.metadata.filename}
              </code>
            )}
          </p>

          {event.metadata?.source && (
            <div className="mb-3">
              <Badge className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-300">
                Source: {event.metadata.source}
              </Badge>
            </div>
          )}

          {event.actions && event.actions.length > 0 && (
            <div className="flex gap-3">
              {event.actions.map((action, index) => (
                <Button
                  key={index}
                  variant={action.type === 'primary' ? 'default' : 'ghost'}
                  size="sm"
                  className="text-xs font-semibold flex items-center gap-1"
                >
                  {action.icon === 'arrow_forward' && <ArrowRight className="w-3 h-3" />}
                  {action.icon === 'download' && <Download className="w-3 h-3" />}
                  {action.icon === 'description' && <FileCheck className="w-3 h-3" />}
                  {action.label}
                </Button>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};