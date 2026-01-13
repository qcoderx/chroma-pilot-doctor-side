import React from 'react';
import { motion } from 'framer-motion';
import ScrambledText from '../ui/ScrambledText';
import SimpleCounter from '../ui/SimpleCounter';

export const ProblemStatement: React.FC = () => {
  const problems = [
    {
      icon: 'data_usage',
      title: 'Drowning in Data, Starving for Insight',
      stats: [
        { value: 40, label: 'Exabytes of biological data generated annually', suffix: '+' },
        { value: 99, label: 'of genomic data remains dark/unused', suffix: '%' }
      ],
      description: 'Sequencing costs $200, but interpretation is still broken. DNA data without context cannot save lives.'
    },
    {
      icon: 'emergency',
      title: 'Preventable Harm is Happening',
      stats: [
        { value: 4, label: 'ADRs are the leading cause of death globally', suffix: 'th' },
        { value: 10.7, label: 'of Lagos Teaching Hospital admissions are ADR-related', suffix: '%' }
      ],
      description: 'Sudden cardiac deaths in young Africans often stem from undiagnosed APOL1-associated cardiomyopathies.'
    },
    {
      icon: 'local_hospital',
      title: 'Doctors are Overwhelmed',
      stats: [
        { value: 5000, label: 'people per doctor in Nigeria (WHO standard: 600)', suffix: ':1' },
        { value: 4000, label: 'doctors left Nigeria in 2024 alone', suffix: '+' }
      ],
      description: 'No doctor has time to manually analyze billions of base pairs across hundreds of patients.'
    }
  ];

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900" id="problem">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
            The Clinical Reality
          </h2>
          <div className="max-w-3xl mx-auto">
            <ScrambledText 
              radius={100}
              duration={800}
              className="text-lg text-slate-600 dark:text-slate-400 font-body"
            >
              Healthcare systems across Africa face an unprecedented challenge: exponential growth in biological data with no corresponding increase in interpretation capacity.
            </ScrambledText>
          </div>
        </motion.div>
        
        <div className="grid gap-8 md:grid-cols-3">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl text-red-600">{problem.icon}</span>
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-lg">{problem.title}</h3>
              </div>
              
              <div className="space-y-3 mb-4">
                {problem.stats.map((stat, i) => (
                  <div key={i} className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-red-600">
                      <SimpleCounter 
                        value={stat.value}
                        fontSize={24}
                        textColor="#dc2626"
                        fontWeight={900}
                      />
                      {stat.suffix}
                    </span>
                    <span className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</span>
                  </div>
                ))}
              </div>
              
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {problem.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};