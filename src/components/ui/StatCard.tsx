import React from 'react';
import { motion } from 'framer-motion';

interface StatCardProps {
  title: string;
  value: string | number;
  change: number;
  changeLabel: string;
  icon: string;
  iconColor: string;
  iconBgColor: string;
  isPositive?: boolean;
  subtitle?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  changeLabel,
  icon,
  iconColor,
  iconBgColor,
  isPositive = true,
  subtitle
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-surface-light rounded-xl p-6 border border-border-light shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
      role="article"
      aria-label={`${title}: ${value}`}
    >
      <div className="flex items-center justify-between mb-4">
        <p className="text-text-sub-light font-medium font-body text-sm">{title}</p>
        <div className={`size-8 rounded-full ${iconBgColor} flex items-center justify-center ${iconColor}`}>
          <span className="material-symbols-outlined text-xl" aria-hidden="true">{icon}</span>
        </div>
      </div>
      
      <div className="flex items-baseline gap-2">
        <p className="text-3xl font-bold font-display text-text-main-light">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </p>
        <span 
          className={`inline-flex items-center text-xs font-medium font-body px-2 py-0.5 rounded-full ${
            isPositive 
              ? 'text-emerald-600 bg-emerald-50' 
              : 'text-red-600 bg-red-50'
          }`}
          aria-label={`${isPositive ? 'Increase' : 'Decrease'} of ${Math.abs(change)}% ${changeLabel}`}
        >
          <span className="material-symbols-outlined text-sm mr-0.5" aria-hidden="true">
            {isPositive ? 'trending_up' : 'trending_down'}
          </span>
          {change > 0 ? '+' : ''}{change}% {changeLabel}
        </span>
      </div>
      
      {subtitle && (
        <p className="text-xs font-body text-text-sub-light mt-2">{subtitle}</p>
      )}
    </motion.div>
  );
};