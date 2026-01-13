import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { PatientProfileHeader } from '../components/features/PatientProfileHeader';
import { PatientHeader } from '../components/features/PatientHeader';
import { Tabs } from '../components/ui/Tabs';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { DrugInteractionChecker } from '../components/features/DrugInteractionChecker';
import { MetabolizerStatusTable } from '../components/features/MetabolizerStatusTable';
import { usePharmacogenomicsData } from '../api/usePharmacogenomics';
import { usePharmacogenomicsStore } from '../store/pharmacogenomicsStore';
import { usePatientProfile } from '../api/usePatientProfile';

const PharmacogenomicsPage: React.FC = () => {
  const { patientId = '992831' } = useParams();
  const { data: pharmacogenomicsData, isLoading, error } = usePharmacogenomicsData(patientId);
  const { data: patientData } = usePatientProfile(patientId);
  const { setPharmacogenomicsData } = usePharmacogenomicsStore();

  useEffect(() => {
    if (pharmacogenomicsData) {
      setPharmacogenomicsData(pharmacogenomicsData);
    }
  }, [pharmacogenomicsData, setPharmacogenomicsData]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#f6f7f8' }}>
        <PatientProfileHeader />
        <main className="flex-1 max-w-[1200px] w-full mx-auto p-4 md:p-10 space-y-8">
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
              <div className="bg-white rounded-xl p-6 h-64" />
              <div className="bg-white rounded-xl p-6 h-96" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !pharmacogenomicsData) {
    return (
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#f6f7f8' }}>
        <PatientProfileHeader />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
              <span className="text-red-600">⚠</span>
            </div>
            <h3 className="text-lg font-medium mb-2" style={{ color: '#0f172a' }}>
              Failed to load pharmacogenomics data
            </h3>
            <p className="mb-4" style={{ color: '#64748b' }}>
              There was an error loading the pharmacogenomics data. Please try again.
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

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#f6f7f8' }}>
      <PatientProfileHeader />
      
      <main className="flex-1 max-w-[1200px] w-full mx-auto p-4 md:p-10 space-y-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumb 
          items={[
            { label: 'Patients', path: '/patients' },
            { label: patientData?.profile.fullName || 'Patient Profile', path: `/patient/${patientId}` },
            { label: 'Pharmacogenomics', current: true }
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
        <div className="bg-white rounded-xl shadow-sm border" style={{ borderColor: '#e2e8f0' }}>
          <Tabs activeTab="pharmacogenomics" onTabChange={() => {}} />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-6 space-y-8"
          >
            {/* Drug Interaction Checker */}
            <DrugInteractionChecker patientId={patientId} />
            
            {/* Metabolizer Status Table */}
            <MetabolizerStatusTable 
              metabolizers={pharmacogenomicsData.geneMetabolizers}
              totalGenes={pharmacogenomicsData.totalGenesAnalyzed}
            />
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

export default PharmacogenomicsPage;