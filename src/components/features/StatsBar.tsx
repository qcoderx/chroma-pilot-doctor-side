import React from 'react';
import { motion } from 'framer-motion';
import SimpleCounter from '../ui/SimpleCounter';
import { statsData } from '../../mocks/landingData';

export const StatsBar: React.FC = () => {
  return (
    <section className="border-y border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 text-center divide-x divide-slate-100 dark:divide-slate-700">
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col gap-1"
            >
              <span className="text-3xl font-black text-slate-900 dark:text-white">
                {stat.numericValue ? (
                  <>
                    <SimpleCounter 
                      value={stat.numericValue}
                      fontSize={32}
                      textColor="inherit"
                      fontWeight={900}
                    />
                    {stat.value.includes('%') && '%'}
                    {stat.value.includes('k') && 'k+'}
                    {stat.value.includes('m') && 'm'}
                    {stat.value.includes('+') && !stat.value.includes('k') && '+'}
                  </>
                ) : (
                  stat.value
                )}
              </span>
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};