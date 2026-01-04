import React from 'react';
import { motion } from 'framer-motion';
import SimpleCounter from '../ui/SimpleCounter';
import { agentsData } from '../../mocks/landingData';

const roleColors = {
  'PRIMARY ANALYST': 'text-blue-600',
  'CORRELATION ENGINE': 'text-cyan-600',
  'SYNTHESIZER': 'text-indigo-500'
};

const progressColors = {
  'PRIMARY ANALYST': 'bg-blue-600',
  'CORRELATION ENGINE': 'bg-cyan-500',
  'SYNTHESIZER': 'bg-indigo-500'
};

export const AgentsSection: React.FC = () => {
  return (
    <section className="py-24 bg-white dark:bg-slate-800 border-y border-slate-200 dark:border-slate-700" id="agents">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
            Meet the Agents
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400">
            Chroma-Pilot isn't a single algorithm. It's a coalition of specialized AI agents working in concert to validate findings.
          </p>
        </motion.div>
        
        <div className="grid gap-8 md:grid-cols-3">
          {agentsData.map((agent, index) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-xl bg-slate-50 dark:bg-slate-900 p-6 border border-slate-200 dark:border-slate-700"
            >
              {/* Background Icon */}
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined text-8xl">{agent.icon}</span>
              </div>
              
              <div className="relative z-10">
                {/* Version Badge */}
                <div className="mb-4 inline-flex items-center gap-2 rounded bg-slate-200 dark:bg-slate-700 px-2 py-1 text-xs font-mono font-medium text-slate-600 dark:text-slate-300">
                  {agent.version}
                </div>
                
                {/* Agent Info */}
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {agent.name}
                </h3>
                <p className={`text-xs font-mono mb-4 ${roleColors[agent.role as keyof typeof roleColors]}`}>
                  {agent.role}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {agent.description}
                </p>
              </div>
              
              {/* Accuracy Bar */}
              <div className="mt-6 h-1 w-full rounded bg-slate-200 dark:bg-slate-700 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${agent.accuracy}%` }}
                  transition={{ delay: 0.5 + index * 0.2, duration: 1, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className={`h-full ${progressColors[agent.role as keyof typeof progressColors]}`}
                />
              </div>
              <div className="mt-1 flex justify-between text-[10px] font-mono text-slate-500">
                <span>{agent.role === 'CORRELATION ENGINE' ? 'NLP RECALL' : agent.role === 'SYNTHESIZER' ? 'READABILITY' : 'ACCURACY'}</span>
                <span className="flex items-center">
                  <SimpleCounter 
                    value={agent.accuracy}
                    fontSize={10}
                    textColor="inherit"
                    fontWeight={500}
                  />
                  %
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};