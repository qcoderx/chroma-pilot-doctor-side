import React from 'react';
import { motion } from 'framer-motion';
import { Dna, User } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { WizardStepper } from '../components/features/WizardStepper';
import { PatientDetailsStep } from '../components/features/PatientDetailsStep';
import { FileUploadStep } from '../components/features/FileUploadStep';
import { ProcessingStep } from '../components/features/ProcessingStep';
import { useAddPatientStore } from '../store/addPatientStore';

const AddPatientPage: React.FC = () => {
  const { currentStep } = useAddPatientStore();

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'details':
        return <PatientDetailsStep />;
      case 'upload':
        return <FileUploadStep />;
      case 'processing':
        return <ProcessingStep />;
      default:
        return <PatientDetailsStep />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#f6f7f8' }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-5xl mb-12 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <motion.div
            className="w-10 h-10 rounded-lg flex items-center justify-center shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #137fec 0%, #3b82f6 100%)',
              boxShadow: '0 4px 6px -1px rgba(19, 127, 236, 0.2)'
            }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <img 
              src="/src/images/chromapilotlogo.png" 
              alt="Chroma-Pilot" 
              className="w-6 h-6"
            />
          </motion.div>
          <div>
            <h1 className="text-xl font-bold tracking-tight" style={{ color: '#0f172a' }}>
              Chroma-Pilot
            </h1>
            <p className="text-sm" style={{ color: '#64748b' }}>
              Clinical Genomics Dashboard
            </p>
          </div>
        </div>
        
        <div className="hidden sm:flex items-center gap-4">
          <div className="h-8 w-8 rounded-full overflow-hidden relative ring-2" style={{ ringColor: 'rgba(19, 127, 236, 0.2)' }}>
            <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: 'rgba(19, 127, 236, 0.1)' }}>
              <User className="w-4 h-4" style={{ color: '#137fec' }} />
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium" style={{ color: '#0f172a' }}>Dr. S. Chen</p>
            <p className="text-xs" style={{ color: '#64748b' }}>Chief Oncologist</p>
          </div>
        </div>
      </motion.div>

      {/* Main Wizard Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="w-full max-w-4xl"
      >
        {/* Breadcrumb Navigation */}
        <Breadcrumb 
          items={[
            { label: 'Patients', path: '/patients' },
            { label: 'Add New Patient', current: true }
          ]}
        />
        
        <div className="bg-white rounded-2xl shadow-xl border overflow-hidden" style={{ borderColor: '#e2e8f0' }}>
          <WizardStepper currentStep={currentStep} />
          {renderCurrentStep()}
        </div>
      </motion.div>

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

export default AddPatientPage;