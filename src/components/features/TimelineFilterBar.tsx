import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, ChevronDown } from 'lucide-react';
import { TimelineFilter } from '../../types/timeline.types';
import { Button } from '../ui/Button';

interface TimelineFilterBarProps {
  filters: TimelineFilter[];
  activeFilter: TimelineFilter['type'];
  onFilterChange: (filter: TimelineFilter['type']) => void;
}

export const TimelineFilterBar: React.FC<TimelineFilterBarProps> = ({
  filters,
  activeFilter,
  onFilterChange
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const activeFilterLabel = filters.find(f => f.type === activeFilter)?.label || 'All Events';

  return (
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
        Patient Journey
      </h3>
      
      <div className="relative">
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700"
        >
          <Filter className="w-4 h-4 text-slate-400" />
          Filter: {activeFilterLabel}
          <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </Button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg z-20"
            >
              <div className="py-1">
                {filters.map((filter) => (
                  <button
                    key={filter.type}
                    onClick={() => {
                      onFilterChange(filter.type);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors ${
                      activeFilter === filter.type
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium'
                        : 'text-slate-700 dark:text-slate-200'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Backdrop */}
        {isOpen && (
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
        )}
      </div>
    </div>
  );
};