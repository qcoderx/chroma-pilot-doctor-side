import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logoFull from '../../assets/images/logo-full.png';

interface LoadingScreenProps {
  isVisible?: boolean;
  message?: string;
  progress?: number;
  showProgress?: boolean;
  onComplete?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  isVisible = true,
  message,
  progress,
  showProgress = false,
  onComplete
}) => {
  const [shouldRender, setShouldRender] = useState(isVisible);

  // Respect user's motion preferences
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  useEffect(() => {
    if (!isVisible) {
      // Delay unmounting to allow fade-out animation
      const timer = setTimeout(() => {
        setShouldRender(false);
        onComplete?.();
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setShouldRender(true);
    }
  }, [isVisible, onComplete]);

  if (!shouldRender) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800"
          role="status"
          aria-live="polite"
          aria-label={message || "Loading application"}
        >
          {/* Logo with breathing animation */}
          <motion.div
            animate={prefersReducedMotion ? {} : {
              scale: [1, 1.05, 1],
              opacity: [0.9, 1, 0.9]
            }}
            transition={prefersReducedMotion ? {} : {
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity
            }}
            className="flex items-center justify-center"
          >
            <img
              src={logoFull}
              alt="Chroma-Pilot Logo"
              className="w-[448px] sm:w-[512px] md:w-[640px] h-auto object-contain"
              draggable={false}
            />
          </motion.div>

          {/* Optional message */}
          {message && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.3 }}
              className="mt-8 text-lg font-medium text-slate-600 dark:text-slate-300 font-body"
            >
              {message}
            </motion.p>
          )}

          {/* Optional progress bar */}
          {showProgress && typeof progress === 'number' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.3 }}
              className="mt-6 w-64 sm:w-80"
            >
              <div className="h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full"
                />
              </div>
              <p className="mt-2 text-sm text-center text-slate-500 dark:text-slate-400 font-mono">
                {Math.round(progress)}%
              </p>
            </motion.div>
          )}

          {/* Animated dots (when no progress bar) */}
          {!showProgress && !message && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.3 }}
              className="mt-8 flex space-x-2"
            >
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={index}
                  animate={prefersReducedMotion ? {} : {
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={prefersReducedMotion ? {} : {
                    duration: 1.5,
                    ease: "easeInOut",
                    repeat: Infinity,
                    delay: index * 0.2
                  }}
                  className="w-2 h-2 bg-blue-600 rounded-full"
                />
              ))}
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};