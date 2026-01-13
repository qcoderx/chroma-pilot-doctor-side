import React from 'react';
import { motion } from 'framer-motion';
import { ClinicalAlert } from '../../types/dashboard.types';

interface AlertCardProps {
  alert: ClinicalAlert;
  onClick?: () => void;
}

const severityConfig = {
  Critical: {
    borderColor: 'border-border-light hover:border-red-200',
    leftBorder: 'bg-red-500',
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600',
    categoryColor: 'text-red-600'
  },
  Moderate: {
    borderColor: 'border-border-light hover:border-yellow-200',
    leftBorder: 'bg-yellow-500',
    iconBg: 'bg-yellow-100',
    iconColor: 'text-yellow-600',
    categoryColor: 'text-yellow-600'
  },
  Info: {
    borderColor: 'border-border-light hover:border-blue-200',
    leftBorder: 'bg-blue-500',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    categoryColor: 'text-blue-600'
  }
};

export const AlertCard: React.FC<AlertCardProps> = ({ alert, onClick }) => {
  const config = severityConfig[alert.severity];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className={`rounded-xl border bg-surface-light p-4 shadow-sm relative overflow-hidden group cursor-pointer transition-colors ${config.borderColor}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`${alert.severity} alert: ${alert.title} for ${alert.patient}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${config.leftBorder}`} />
      
      <div className="flex gap-4">
        <div className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${config.iconBg} ${config.iconColor}`}>
          <span className="material-symbols-outlined" aria-hidden="true">{alert.icon}</span>
        </div>
        
        <div className="flex-1">
          <p className="font-semibold font-display text-text-main-light line-clamp-1">
            {alert.title}
          </p>
          <p className="text-sm font-body text-text-sub-light line-clamp-1">
            {alert.patient}
          </p>
          
          <div className="mt-2 flex items-center gap-2 text-xs">
            <span className={`font-medium font-body ${config.categoryColor}`}>
              {alert.category}
            </span>
            <span className="text-text-sub-light font-body">
              • {alert.timeAgo}
            </span>
          </div>
        </div>
        
        <div className="shrink-0 flex items-center">
          <span className="material-symbols-outlined text-text-sub-light group-hover:text-primary transition-colors" aria-hidden="true">
            chevron_right
          </span>
        </div>
      </div>
    </motion.div>
  );
};