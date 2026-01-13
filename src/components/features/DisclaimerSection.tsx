import React from 'react';
import { motion } from 'framer-motion';

export const DisclaimerSection: React.FC = () => {
  return (
    <section className="py-12 bg-slate-100 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-amber-600">info</span>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Clinical Decision-Support System
            </h3>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-3 text-sm text-slate-600 dark:text-slate-400">
            <p>
              <strong>Chroma-Pilot does not diagnose.</strong> Chroma-Pilot does not prescribe. 
              Chroma-Pilot assists clinicians by reducing cognitive overload, surfacing missed insights, 
              and confirming risks with multiple signals.
            </p>
            
            <p>
              All outputs are recommendations, alerts, and assistive insights - never diagnoses or treatment orders. 
              Clinical judgment and physician oversight remain essential for all patient care decisions.
            </p>
            
            <p className="text-xs">
              For use by qualified healthcare professionals only. HIPAA compliant. 
              Designed for research hospitals and clinical environments with appropriate medical oversight.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};