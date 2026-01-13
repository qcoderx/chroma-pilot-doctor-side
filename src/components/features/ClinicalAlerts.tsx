import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertCard } from '../ui/AlertCard';
import { ClinicalAlert } from '../../types/dashboard.types';

interface ClinicalAlertsProps {
  alerts: ClinicalAlert[];
}

export const ClinicalAlerts: React.FC<ClinicalAlertsProps> = ({ alerts }) => {
  const handleAlertClick = (alert: ClinicalAlert) => {
    if (alert.patientId !== 'SYSTEM') {
      // TODO: Implement navigation logic
    }
  };

  return (
    <div className="flex flex-col gap-4" role="region" aria-label="Clinical alerts">
      <h3 className="text-lg font-bold font-display text-text-main-light">
        Recent Clinical Alerts
      </h3>
      
      <div className="flex flex-col gap-3" role="list" aria-label="List of clinical alerts">
        {alerts.map((alert, index) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            role="listitem"
          >
            <AlertCard 
              alert={alert} 
              onClick={() => handleAlertClick(alert)}
            />
          </motion.div>
        ))}
      </div>
      
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        className="w-full mt-2 py-2 text-sm font-medium font-body text-primary hover:bg-primary/5 rounded-lg border border-transparent hover:border-primary/20 transition-all flex items-center justify-center gap-2"
        aria-label="View all clinical alerts"
      >
        View All Alerts
        <span className="material-symbols-outlined text-base" aria-hidden="true">arrow_forward</span>
      </motion.button>
    </div>
  );
};