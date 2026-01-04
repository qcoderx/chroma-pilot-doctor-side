import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = false,
  padding = 'md'
}) => {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };
  
  const baseClasses = `rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 ${paddingClasses[padding]}`;
  const hoverClasses = hover ? 'hover:border-blue-600/30 transition-colors cursor-pointer' : '';
  
  const Component = hover ? motion.div : 'div';
  const motionProps = hover ? {
    whileHover: { y: -2 },
    transition: { duration: 0.2 }
  } : {};
  
  return (
    <Component
      className={`${baseClasses} ${hoverClasses} ${className}`}
      {...motionProps}
    >
      {children}
    </Component>
  );
};