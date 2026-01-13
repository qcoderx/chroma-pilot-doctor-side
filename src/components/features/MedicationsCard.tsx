import React from 'react';
import { motion } from 'framer-motion';
import { Pill, AlertTriangle } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Medication } from '../../types/patientProfile.types';

interface MedicationsCardProps {
  medications: Medication[];
}

export const MedicationsCard: React.FC<MedicationsCardProps> = ({ medications }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.5 }}
    >
      <Card className="flex flex-col h-full">
        <div className="px-5 py-4 border-b bg-slate-50/50" style={{ borderColor: '#e2e8f0' }}>
          <h3 className="font-bold flex items-center gap-2" style={{ color: '#0f172a' }}>
            <Pill className="w-5 h-5" style={{ color: '#10b981' }} />
            Active Medications
          </h3>
        </div>
        
        <div className="p-1 flex-1">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-slate-50/50" style={{ color: '#64748b' }}>
              <tr>
                <th className="px-4 py-3 font-medium">Drug</th>
                <th className="px-4 py-3 font-medium">Dosage</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: '#e2e8f0' }}>
              {medications.map((medication, index) => (
                <motion.tr
                  key={index}
                  whileHover={{ backgroundColor: '#f8fafc' }}
                  transition={{ duration: 0.15 }}
                >
                  <td className="px-4 py-3 font-medium" style={{ color: '#0f172a' }}>
                    {medication.name}
                  </td>
                  <td className="px-4 py-3" style={{ color: medication.hasAlert ? '#ef4444' : '#64748b' }}>
                    <div className="flex items-center gap-1">
                      <span className={medication.hasAlert ? 'font-bold' : ''}>
                        {medication.dosage}
                      </span>
                      {medication.hasAlert && (
                        <AlertTriangle className="w-3 h-3" title="Alert" />
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-3 border-t" style={{ borderColor: '#e2e8f0' }}>
          <Button
            variant="ghost"
            className="w-full py-2 text-sm font-medium hover:bg-slate-50 rounded transition-colors"
            style={{ color: '#137fec' }}
          >
            Manage Prescriptions
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};