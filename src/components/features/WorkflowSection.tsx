import React from 'react';
import { motion } from 'framer-motion';
import { workflowSteps } from '../../mocks/landingData';
import ScrambledText from '../ui/ScrambledText';

export const WorkflowSection: React.FC = () => {
  return (
    <section className="py-20 bg-white dark:bg-slate-800 relative" id="workflow">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Clinical Decision-Support Workflow
          </h2>
          <div className="mt-2">
            <ScrambledText 
              radius={100}
              duration={800}
              className="text-slate-500 dark:text-slate-400 font-body"
            >
              From static VCF files to live biological intelligence. Designed for high-throughput clinical environments.
            </ScrambledText>
          </div>
        </motion.div>
        
        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-slate-200 dark:bg-slate-700 -z-0"></div>
          
          <div className="grid gap-12 md:grid-cols-3 relative z-10">
            {workflowSteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="group flex flex-col items-center text-center"
              >
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="mb-6 flex h-24 w-24 items-center justify-center rounded-2xl bg-white dark:bg-slate-700 border-2 border-slate-100 dark:border-slate-600 shadow-xl group-hover:border-blue-600/50 transition-all duration-300"
                >
                  <span className={`material-symbols-outlined text-4xl text-blue-600 ${step.icon === 'psychology' ? 'animate-pulse' : ''}`}>
                    {step.icon}
                  </span>
                </motion.div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-xs">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};