import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { WizardStep } from '../../types/addPatient.types';

interface WizardStepperProps {
  currentStep: WizardStep;
}

const steps = [
  { key: 'details', label: 'Details', number: 1 },
  { key: 'upload', label: 'Upload', number: 2 },
  { key: 'processing', label: 'Process', number: 3 },
] as const;

export const WizardStepper: React.FC<WizardStepperProps> = ({ currentStep }) => {
  const currentStepIndex = steps.findIndex(step => step.key === currentStep);
  
  return (
    <div className="bg-slate-50 border-b px-8 py-6" style={{ borderColor: '#e2e8f0' }}>
      <div className="flex items-center justify-between max-w-lg mx-auto mb-2 relative">
        {/* Progress Line Background */}
        <div className="absolute top-1/2 left-0 w-full h-0.5 -z-0" style={{ backgroundColor: '#e2e8f0' }} />
        
        {/* Active Progress Line */}
        <motion.div
          className="absolute top-1/2 left-0 h-0.5 -z-0"
          style={{ backgroundColor: '#137fec' }}
          initial={{ width: '0%' }}
          animate={{ 
            width: currentStepIndex === 0 ? '25%' : 
                   currentStepIndex === 1 ? '75%' : '100%' 
          }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
        
        {/* Step Nodes */}
        {steps.map((step, index) => {
          const isCompleted = index < currentStepIndex;
          const isCurrent = index === currentStepIndex;
          const isUpcoming = index > currentStepIndex;
          
          return (
            <motion.div
              key={step.key}
              className="relative z-10 flex flex-col items-center gap-2"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <motion.div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-lg transition-all ${
                  isCompleted || isCurrent
                    ? 'text-white shadow-primary/30'
                    : 'border-2 text-slate-400'
                }`}
                style={{
                  backgroundColor: isCompleted || isCurrent ? '#137fec' : '#ffffff',
                  borderColor: isUpcoming ? '#e2e8f0' : 'transparent'
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4" />
                ) : (
                  step.number
                )}
              </motion.div>
              <span
                className={`text-xs font-medium ${
                  isCurrent ? 'font-bold' : 'font-medium'
                }`}
                style={{
                  color: isCompleted || isCurrent ? '#137fec' : '#64748b'
                }}
              >
                {step.label}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};