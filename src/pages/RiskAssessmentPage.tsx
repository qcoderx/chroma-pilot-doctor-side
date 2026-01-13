import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { PatientProfileHeader } from '../components/features/PatientProfileHeader';
import { PatientHeader } from '../components/features/PatientHeader';
import { Tabs } from '../components/ui/Tabs';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { RiskFilterBar } from '../components/features/RiskFilterBar';
import { RiskConditionsList } from '../components/features/RiskConditionsList';
import { useRiskAssessmentData } from '../api/useRiskAssessment';
import { useRiskAssessmentStore } from '../store/riskAssessmentStore';
import { usePatientProfile } from '../api/usePatientProfile';

const RiskAssessmentPage: React.FC = () => {
  const { patientId = '88291039' } = useParams();
  const { data: riskData, isLoading, error } = useRiskAssessmentData(patientId);
  const { data: patientData } = usePatientProfile(patientId);
  const { setRiskData, setLoading } = useRiskAssessmentStore();

  useEffect(() => {
    setLoading(isLoading);
    if (riskData) {
      setRiskData(riskData);
    }
  }, [riskData, isLoading, setRiskData, setLoading]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#f6f7f8' }}>
        <PatientProfileHeader />
        <main className="flex-1 max-w-[1024px] w-full mx-auto p-4 md:p-8 space-y-6">
          <div className="animate-pulse">
            <div className="bg-white rounded-xl p-6 mb-8">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 bg-slate-200 rounded-full" />
                <div className="space-y-3">
                  <div className="h-6 bg-slate-200 rounded w-48" />
                  <div className="h-4 bg-slate-200 rounded w-64" />
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-4 h-20" />
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl p-6 h-64" />
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !riskData) {
    return (
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#f6f7f8' }}>
        <PatientProfileHeader />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
              <span className="text-red-600">⚠</span>
            </div>
            <h3 className="text-lg font-medium mb-2" style={{ color: '#0f172a' }}>
              Failed to load risk assessment data
            </h3>
            <p className="mb-4" style={{ color: '#64748b' }}>
              There was an error loading the risk assessment data. Please try again.
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-blue-600"
            >
              Retry
            </button>
          </div>
        </main>
      </div>
    );
  }

  const criticalCount = riskData.conditions.filter(c => c.riskLevel === 'critical' || c.riskLevel === 'high').length;

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#f6f7f8' }}>
      <PatientProfileHeader />
      
      <main className="flex-1 flex flex-col items-center py-6 px-4 md:px-8">
        <div className="w-full max-w-[1024px] flex flex-col gap-6">
          {/* Breadcrumb Navigation */}
          <Breadcrumb 
            items={[
              { label: 'Patients', path: '/patients' },
              { label: patientData?.profile.fullName || 'Patient Profile', path: `/patient/${patientId}` },
              { label: 'Risk Assessment', current: true }
            ]}
          />

          {/* Patient Header */}
          {patientData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <PatientHeader profile={patientData.profile} />
            </motion.div>
          )}

          {/* Tabs Navigation */}
          <nav className="border-b flex gap-8 overflow-x-auto" style={{ borderColor: '#cbd5e1' }}>
            <motion.button
              className="pb-3 pt-2 border-b-[3px] text-sm font-bold whitespace-nowrap flex items-center gap-2"
              style={{ 
                borderColor: '#137fec',
                color: '#137fec'
              }}
              whileHover={{ scale: 1.02 }}
            >
              Risk Assessment
              {criticalCount > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-100 text-[10px] text-red-600 font-bold">
                  {criticalCount}
                </span>
              )}
            </motion.button>
            <button className="pb-3 pt-2 border-b-[3px] border-transparent text-sm font-bold hover:text-primary whitespace-nowrap" style={{ color: '#64748b' }}>
              Genomic Overview
            </button>
            <button className="pb-3 pt-2 border-b-[3px] border-transparent text-sm font-bold hover:text-primary whitespace-nowrap" style={{ color: '#64748b' }}>
              Variant List
            </button>
            <button className="pb-3 pt-2 border-b-[3px] border-transparent text-sm font-bold hover:text-primary whitespace-nowrap" style={{ color: '#64748b' }}>
              Pharmacogenomics
            </button>
          </nav>

          {/* Filter Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <RiskFilterBar />
          </motion.div>

          {/* Risk Conditions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <RiskConditionsList conditions={riskData.conditions} />
          </motion.div>
        </div>
      </main>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#ffffff',
            color: '#0f172a',
            border: '1px solid #e2e8f0',
          },
        }}
      />
    </div>
  );
};

export default RiskAssessmentPage;