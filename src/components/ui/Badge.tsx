import React from 'react';
import { motion } from 'framer-motion';

interface BadgeProps {
  variant: 'high-risk' | 'medium-risk' | 'low-risk' | 'info' | 'success' | 'warning' | 'critical';
  children: React.ReactNode;
  className?: string;
}

const variantStyles = {
  'high-risk': {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    color: '#dc2626',
    borderColor: 'rgba(239, 68, 68, 0.2)'
  },
  'medium-risk': {
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    color: '#d97706',
    borderColor: 'rgba(245, 158, 11, 0.2)'
  },
  'low-risk': {
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    color: '#16a34a',
    borderColor: 'rgba(34, 197, 94, 0.2)'
  },
  'info': {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    color: '#2563eb',
    borderColor: 'rgba(59, 130, 246, 0.2)'
  },
  'success': {
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    color: '#16a34a',
    borderColor: 'rgba(34, 197, 94, 0.2)'
  },
  'warning': {
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    color: '#d97706',
    borderColor: 'rgba(245, 158, 11, 0.2)'
  },
  'critical': {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    color: '#dc2626',
    borderColor: 'rgba(239, 68, 68, 0.2)'
  }
};

export const Badge: React.FC<BadgeProps> = ({ variant, children, className = '' }) => {
  const styles = variantStyles[variant];
  
  return (
    <motion.span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${className}`}
      style={styles}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.15 }}
    >
      {children}
    </motion.span>
  );
};