import React from 'react';
import { motion } from 'framer-motion';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  description,
  className = '',
  ...props
}) => {
  return (
    <label className={`flex items-center gap-2 cursor-pointer group ${className}`}>
      <div className="relative flex items-center">
        <input
          type="checkbox"
          className="peer h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-800 dark:focus:ring-offset-slate-900 transition-all"
          {...props}
        />
        <motion.div
          className="absolute inset-0 rounded border-2 border-transparent peer-checked:border-blue-600 peer-focus:ring-2 peer-focus:ring-blue-500/20 pointer-events-none"
          initial={false}
          animate={{
            scale: props.checked ? 1.1 : 1,
          }}
          transition={{ duration: 0.15 }}
        />
      </div>
      {label && (
        <div className="flex flex-col">
          <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 dark:text-slate-400 dark:group-hover:text-slate-200 transition-colors">
            {label}
          </span>
          {description && (
            <span className="text-xs text-slate-500 dark:text-slate-500">
              {description}
            </span>
          )}
        </div>
      )}
    </label>
  );
};