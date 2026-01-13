import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { PatientProfileHeader } from '../components/features/PatientProfileHeader';
import { PatientHeader } from '../components/features/PatientHeader';
import { Tabs } from '../components/ui/Tabs';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { VitalsCard } from '../components/features/VitalsCard';
import { ContactCard } from '../components/features/ContactCard';
import { AlertsPanel } from '../components/features/AlertsPanel';
import { GenomicInsightsCard } from '../components/features/GenomicInsightsCard';
import { MedicationsCard } from '../components/features/MedicationsCard';
import { usePatientProfile } from '../api/usePatientProfile';
import { usePatientProfileStore } from '../store/patientProfileStore';

const PatientProfilePage: React.FC = () => {
  const { patientId = '992-8841' } = useParams();
  const { data, isLoading, error } = usePatientProfile(patientId);
  const { 
    currentTab, 
    setCurrentTab, 
    setPatientData, 
    setLoading, 
    setError, 
    dismissAlert 
  } = usePatientProfileStore();

  useEffect(() => {
    setLoading(isLoading);
    if (data) {
      setPatientData(data);
    }
    if (error) {
      setError(error.message);
    }
  }, [data, isLoading, error, setPatientData, setLoading, setError]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#f6f7f8' }}>
        <PatientProfileHeader />
        <main className="flex-1 max-w-[1400px] w-full mx-auto p-4 md:p-6 lg:p-8 space-y-6">
          <div className="animate-pulse">
            <div className="bg-white rounded-xl p-6 mb-6">
              <div className="flex items-center gap-6">
                <div className="w-28 h-28 bg-slate-200 rounded-full" />
                <div className="space-y-3">
                  <div className="h-8 bg-slate-200 rounded w-48" />
                  <div className="h-4 bg-slate-200 rounded w-64" />
                  <div className="h-4 bg-slate-200 rounded w-32" />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl p-6 h-64" />
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#f6f7f8' }}>
        <PatientProfileHeader />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
              <span className="text-red-600">⚠</span>
            </div>
            <h3 className="text-lg font-medium mb-2" style={{ color: '#0f172a' }}>
              Failed to load patient profile
            </h3>
            <p className="mb-4" style={{ color: '#64748b' }}>
              There was an error loading the patient data. Please try again.
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
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
      
      <main className="flex-1 max-w-[1400px] w-full mx-auto p-4 md:p-6 lg:p-8 space-y-6">
        {/* Breadcrumb Navigation */}
        <Breadcrumb 
          items={[
            { label: 'Patients', path: '/patients' },
            { label: data?.profile.fullName || 'Patient Profile', current: true }
          ]}
        />
        
        {/* Patient Header with Profile Info */}
        <PatientHeader profile={data.profile} />
        
        {/* Tabs Navigation */}
        <div className="bg-white rounded-xl shadow-sm border" style={{ borderColor: '#e2e8f0' }}>
          <Tabs activeTab={currentTab} onTabChange={setCurrentTab} patientId={patientId} />
          
          {/* Tab Content - Overview */}
          {currentTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="p-6"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Vitals & Contact */}
                <div className="space-y-6">
                  <VitalsCard vitals={data.vitals} />
                  <ContactCard contact={data.contact} />
                </div>
                
                {/* Right Columns: Alerts & Clinical Data */}
                <div className="space-y-6 lg:col-span-2">
                  <AlertsPanel 
                    alerts={data.alerts} 
                    onDismissAlert={dismissAlert}
                  />
                  
                  {/* Bottom Row: Genomics & Medications */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <GenomicInsightsCard insights={data.genomicInsights} />
                    <MedicationsCard medications={data.medications} />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Other Tab Content Placeholders */}
          {currentTab !== 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="p-6 text-center"
            >
              <div className="py-12">
                <h3 className="text-lg font-medium mb-2" style={{ color: '#0f172a' }}>
                  {currentTab.charAt(0).toUpperCase() + currentTab.slice(1)} View
                </h3>
                <p style={{ color: '#64748b' }}>
                  This section is under development. Content for {currentTab} will be available soon.
                </p>
              </div>
            </motion.div>
          )}
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

export default PatientProfilePage;