import React from 'react';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';
import { Card } from '../ui/Card';
import { PatientVitals } from '../../types/patientProfile.types';

interface VitalsCardProps {
  vitals: PatientVitals;
}

export const VitalsCard: React.FC<VitalsCardProps> = ({ vitals }) => {
  const getBPStatus = (status: string) => {
    switch (status) {
      case 'elevated': return { color: '#f59e0b', borderColor: '#f59e0b' };
      case 'high': return { color: '#ef4444', borderColor: '#ef4444' };
      default: return { color: 'transparent', borderColor: 'transparent' };
    }
  };

  const bpStyles = getBPStatus(vitals.bloodPressure.status);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <Card>
        <div className="px-5 py-4 border-b flex justify-between items-center bg-slate-50/50" style={{ borderColor: '#e2e8f0' }}>
          <h3 className="font-bold flex items-center gap-2" style={{ color: '#0f172a' }}>
            <Activity className="w-5 h-5" style={{ color: '#137fec' }} />
            Vitals Snapshot
          </h3>
          <span className="text-xs" style={{ color: '#64748b' }}>
            {vitals.lastUpdated}
          </span>
        </div>
        
        <div className="p-5 grid grid-cols-2 gap-4">
          <div className="p-3 rounded-lg" style={{ backgroundColor: '#f8fafc' }}>
            <p className="text-xs font-medium uppercase tracking-wider mb-1" style={{ color: '#64748b' }}>
              Weight
            </p>
            <p className="text-xl font-bold" style={{ color: '#0f172a' }}>
              {vitals.weight.value} {vitals.weight.unit}
              {vitals.weight.change && (
                <span className="text-sm font-normal ml-1" style={{ color: '#64748b' }}>
                  ({vitals.weight.change > 0 ? '+' : ''}{vitals.weight.change})
                </span>
              )}
            </p>
          </div>
          
          <div className="p-3 rounded-lg" style={{ backgroundColor: '#f8fafc' }}>
            <p className="text-xs font-medium uppercase tracking-wider mb-1" style={{ color: '#64748b' }}>
              Height
            </p>
            <p className="text-xl font-bold" style={{ color: '#0f172a' }}>
              {vitals.height.value} {vitals.height.unit}
            </p>
          </div>
          
          <div className="p-3 rounded-lg" style={{ backgroundColor: '#f8fafc' }}>
            <p className="text-xs font-medium uppercase tracking-wider mb-1" style={{ color: '#64748b' }}>
              Blood Type
            </p>
            <p className="text-xl font-bold" style={{ color: '#0f172a' }}>
              {vitals.bloodType}
            </p>
          </div>
          
          <div 
            className="p-3 rounded-lg border-l-4" 
            style={{ 
              backgroundColor: '#f8fafc',
              borderLeftColor: bpStyles.borderColor
            }}
          >
            <p className="text-xs font-medium uppercase tracking-wider mb-1" style={{ color: '#64748b' }}>
              BP
            </p>
            <p className="text-xl font-bold" style={{ color: '#0f172a' }}>
              {vitals.bloodPressure.systolic}/{vitals.bloodPressure.diastolic}
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};