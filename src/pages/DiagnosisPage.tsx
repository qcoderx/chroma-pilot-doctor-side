import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { Download } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { PatientProfileHeader } from '../components/features/PatientProfileHeader';
import { PatientHeader } from '../components/features/PatientHeader';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ClinicalPresentationCard } from '../components/features/ClinicalPresentationCard';
import { GenomicSummaryCard } from '../components/features/GenomicSummaryCard';
import { DiagnosticLeadCard } from '../components/features/DiagnosticLeadCard';
import { useDiagnosisData } from '../api/useDiagnosis';
import { useDiagnosisStore } from '../store/diagnosisStore';
import { usePatientProfile } from '../api/usePatientProfile';

const DiagnosisPage: React.FC = () => {
  const { patientId = 'CP-9821' } = useParams();
  const { data: diagnosisData, isLoading, error } = useDiagnosisData(patientId);
  const { data: patientData } = usePatientProfile(patientId);
  const { setDiagnosisData, setPhenotypeInput } = useDiagnosisStore();

  useEffect(() => {
    if (diagnosisData) {
      setDiagnosisData(diagnosisData);
      setPhenotypeInput(diagnosisData.phenotype);
    }
  }, [diagnosisData, setDiagnosisData, setPhenotypeInput]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#f6f7f8' }}>
        <PatientProfileHeader />
        <main className="flex-1 max-w-[1200px] w-full mx-auto p-4 md:p-8 space-y-6">
          <div className="animate-pulse">
            <div className="bg-white rounded-xl p-6 mb-8">
              <div className="flex items-center gap-6">
                <div className="w-28 h-28 bg-slate-200 rounded-full" />
                <div className="space-y-3">
                  <div className="h-6 bg-slate-200 rounded w-48" />
                  <div className="h-4 bg-slate-200 rounded w-64" />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-5 h-64" />
                <div className="bg-slate-200 rounded-xl h-48" />
              </div>
              <div className="xl:col-span-2 space-y-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl p-6 h-48" />
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !diagnosisData) {
    return (
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#f6f7f8' }}>
        <PatientProfileHeader />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
              <span className="text-red-600">⚠</span>
            </div>
            <h3 className="text-lg font-medium mb-2" style={{ color: '#0f172a' }}>
              Failed to load diagnosis data
            </h3>
            <p className="mb-4" style={{ color: '#64748b' }}>
              There was an error loading the diagnosis data. Please try again.
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

  const highPriorityCount = diagnosisData.diagnosticLeads.filter(lead => lead.priority === 'high').length;

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#f6f7f8' }}>
      <PatientProfileHeader />
      
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-6">
          {/* Breadcrumb Navigation */}
          <Breadcrumb 
            items={[
              { label: 'Patients', path: '/patients' },
              { label: patientData?.profile.fullName || 'Patient Profile', path: `/patient/${patientId}` },
              { label: 'Diagnosis', current: true }
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

          {/* Tabs */}
          <div className="flex border-b gap-8 overflow-x-auto" style={{ borderColor: '#cbd5e1' }}>
            <button className="pb-3 pt-2 border-b-[3px] border-transparent text-sm font-medium hover:text-primary whitespace-nowrap" style={{ color: '#64748b' }}>
              Profile
            </button>
            <button className="pb-3 pt-2 border-b-[3px] border-transparent text-sm font-medium hover:text-primary whitespace-nowrap" style={{ color: '#64748b' }}>
              Timeline
            </button>
            <button className="pb-3 pt-2 border-b-[3px] text-sm font-bold whitespace-nowrap" style={{ 
              borderColor: '#137fec',
              color: '#137fec'
            }}>
              Diagnosis
            </button>
            <button className="pb-3 pt-2 border-b-[3px] border-transparent text-sm font-medium hover:text-primary whitespace-nowrap" style={{ color: '#64748b' }}>
              Treatments
            </button>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Left Column: Input & Summary */}
            <div className="xl:col-span-1 flex flex-col gap-6">
              <ClinicalPresentationCard 
                lastUpdated={diagnosisData.lastUpdated}
                updatedBy={diagnosisData.updatedBy}
              />
              <GenomicSummaryCard summary={diagnosisData.genomicSummary} />
            </div>

            {/* Right Column: Diagnostic Leads */}
            <div className="xl:col-span-2 flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold flex items-center gap-2" style={{ color: '#0f172a' }}>
                  Diagnostic Leads
                  {highPriorityCount > 0 && (
                    <Badge variant="critical">
                      {highPriorityCount} High Priority
                    </Badge>
                  )}
                </h3>
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="sm"
                    className="flex items-center gap-1 text-xs font-medium px-3 py-1.5"
                    style={{
                      backgroundColor: 'rgba(19, 127, 236, 0.1)',
                      color: '#137fec'
                    }}
                  >
                    <Download className="w-4 h-4" />
                    Export Report
                  </Button>
                </motion.div>
              </div>

              {/* Diagnostic Lead Cards */}
              <div className="space-y-4">
                {diagnosisData.diagnosticLeads.map((lead, index) => (
                  <DiagnosticLeadCard
                    key={lead.id}
                    lead={lead}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="h-10" /> {/* Spacer */}
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

export default DiagnosisPage;