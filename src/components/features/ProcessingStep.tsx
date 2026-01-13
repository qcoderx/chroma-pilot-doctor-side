import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Eye, Link, Sparkles, Star, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { useAddPatientStore } from '../../store/addPatientStore';
import { useGlobalPatientStore } from '../../store/globalPatientStore';
import { Patient } from '../../types/patients.types';

export const ProcessingStep: React.FC = () => {
  const navigate = useNavigate();
  const { processingLogs, addProcessingLog, isProcessing, isCompleted, setProcessing, setCompleted, formData } = useAddPatientStore();
  const { addPatient } = useGlobalPatientStore();
  const [newPatientId, setNewPatientId] = useState<string>('');

  useEffect(() => {
    if (!isProcessing && !isCompleted) {
      setProcessing(true);
      
      const logs = [
        { message: 'Validating VCF format...', type: 'success' as const, delay: 500 },
        { message: 'Upload complete (2.4GB)', type: 'success' as const, delay: 1000 },
        { message: 'Variants parsed successfully', type: 'success' as const, delay: 1500 },
        { message: 'AI Agent analyzing risk factors...', type: 'info' as const, delay: 2000 },
        { message: 'Estimating polygenic scores...', type: 'info' as const, delay: 2500 },
        { message: 'Creating patient profile...', type: 'info' as const, delay: 3000 },
        { message: 'Digital twin initialization complete.', type: 'success' as const, delay: 3500 },
      ];

      logs.forEach((log, index) => {
        setTimeout(() => {
          addProcessingLog(log);
          if (index === logs.length - 1) {
            setTimeout(() => {
              // Create new patient
              const patientId = `CP-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
              const newPatient: Patient = {
                id: patientId,
                name: formData.fullName,
                patientNumber: formData.hospitalId || patientId,
                age: formData.dateOfBirth ? new Date().getFullYear() - new Date(formData.dateOfBirth).getFullYear() : 0,
                sex: formData.biologicalSex as 'Male' | 'Female',
                riskLevel: Math.random() > 0.7 ? 'High' : Math.random() > 0.4 ? 'Medium' : 'Low',
                condition: 'Genomic Analysis Complete',
                lastVisit: new Date().toISOString().split('T')[0],
                status: 'Active',
                genomicStatus: 'Sequenced',
                alerts: Math.floor(Math.random() * 3)
              };
              
              addPatient(newPatient);
              setNewPatientId(patientId);
              setProcessing(false);
              setCompleted(true);
            }, 500);
          }
        }, log.delay);
      });
    }
  }, []);

  if (!isCompleted) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="p-8 md:p-12 flex flex-col items-center text-center"
      >
        <div className="mb-8">
          <motion.div
            className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
            style={{ backgroundColor: 'rgba(19, 127, 236, 0.1)' }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
          </motion.div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: '#0f172a' }}>
            Processing Genomic Data
          </h2>
          <p style={{ color: '#64748b' }}>
            Creating AI digital twin from uploaded data...
          </p>
        </div>

        {/* Processing Logs */}
        <div className="w-full max-w-md rounded-lg p-4 mb-8 text-left shadow-inner border" style={{ backgroundColor: '#0f172a', borderColor: '#374151' }}>
          <div className="flex items-center gap-2 mb-2 border-b pb-2" style={{ borderColor: '#374151' }}>
            <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
            <span className="text-xs ml-2" style={{ color: '#64748b' }}>System Log</span>
          </div>
          <div className="font-mono text-xs space-y-1.5 h-32 overflow-y-auto">
            {processingLogs.map((log, index) => (
              <motion.p
                key={log.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center gap-2 ${
                  log.type === 'success' ? 'text-green-400' : 
                  log.type === 'info' ? 'text-blue-400' : 'text-red-400'
                }`}
              >
                <Check className="w-2.5 h-2.5" />
                {log.message}
              </motion.p>
            ))}
            {isProcessing && (
              <motion.p
                className="text-blue-400 flex items-center gap-2"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-2.5 h-2.5"
                >
                  ⟳
                </motion.div>
                Processing...
              </motion.p>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="p-8 md:p-12 flex flex-col items-center text-center"
    >
      {/* Success Animation */}
      <div className="relative mb-6">
        <motion.div
          className="absolute inset-0 blur-xl rounded-full"
          style={{ backgroundColor: 'rgba(19, 127, 236, 0.2)' }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div
          className="relative w-20 h-20 rounded-full flex items-center justify-center shadow-xl"
          style={{ 
            background: 'linear-gradient(135deg, #10b981 0%, #137fec 100%)',
            boxShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.2)'
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        >
          <Check className="w-10 h-10 text-white" />
        </motion.div>
        
        {/* Decorative Elements */}
        <motion.div
          className="absolute -top-4 -left-6"
          initial={{ opacity: 0, rotate: 0 }}
          animate={{ opacity: 1, rotate: 12 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Sparkles className="w-6 h-6 text-yellow-400" />
        </motion.div>
        <motion.div
          className="absolute -bottom-2 -right-8"
          initial={{ opacity: 0, rotate: 0 }}
          animate={{ opacity: 1, rotate: -12 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <Star className="w-6 h-6 text-pink-400" />
        </motion.div>
        <motion.div
          className="absolute top-1/2 -right-12"
          initial={{ opacity: 0, rotate: 0 }}
          animate={{ opacity: 1, rotate: 45 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          <Award className="w-5 h-5 text-blue-400" />
        </motion.div>
      </div>

      <motion.h2
        className="text-3xl font-bold mb-3"
        style={{ color: '#0f172a' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Digital Twin Created!
      </motion.h2>
      
      <motion.p
        className="max-w-md mb-8"
        style={{ color: '#64748b' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        The patient's genomic data has been successfully parsed and the AI digital twin is now active.
      </motion.p>

      {/* Action Buttons */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4 w-full justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            variant="ghost"
            className="px-8 py-3 rounded-xl text-sm font-semibold border shadow-sm transition-all"
            style={{
              backgroundColor: '#ffffff',
              color: '#374151',
              borderColor: '#e2e8f0'
            }}
          >
            <Link className="w-4 h-4 mr-2" />
            Generate App Link
          </Button>
        </motion.div>
        
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            onClick={() => newPatientId ? navigate(`/patient/${newPatientId}`) : navigate('/patients')}
            className="px-8 py-3 rounded-xl text-sm font-semibold shadow-lg transition-all flex items-center justify-center gap-2"
            style={{
              backgroundColor: '#137fec',
              color: '#ffffff',
              boxShadow: '0 4px 6px -1px rgba(19, 127, 236, 0.3)'
            }}
          >
            <Eye className="w-4 h-4" />
            View Patient Profile
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};