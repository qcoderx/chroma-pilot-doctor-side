import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LoadingScreen } from './src/components/ui/LoadingScreen';
import { ProtectedRoute } from './src/components/auth/ProtectedRoute';
import { useLoadingStore } from './src/store/loadingStore';
import { useAuthStore } from './src/store/authStore';

// Layouts
import DoctorLayout from './src/components/layouts/DoctorLayout';

// Pages
import LandingPage from './src/pages/LandingPage';
import LoginPage from './src/pages/LoginPage';
import DashboardPage from './src/pages/DashboardPage';
import AddPatientPage from './src/pages/AddPatientPage';
import PatientListPage from './src/pages/PatientListPage';
import PatientProfilePage from './src/pages/PatientProfilePage';
import PharmacogenomicsPage from './src/pages/PharmacogenomicsPage';
import RiskAssessmentPage from './src/pages/RiskAssessmentPage';
import DiagnosisPage from './src/pages/DiagnosisPage';
import PatientTimelinePage from './src/pages/PatientTimelinePage';
import AnalyticsPage from './src/pages/AnalyticsPage';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App: React.FC = () => {
  const { isAppLoading, isGenomeProcessing, loadingMessage, loadingProgress, setAppLoading } = useLoadingStore();
  const { isAuthenticated } = useAuthStore();
  
  // Simulate initial app loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setAppLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [setAppLoading]);
  
  const shouldShowLoading = isAppLoading || isGenomeProcessing;
  
  // Don't render anything while loading
  if (shouldShowLoading) {
    return (
      <QueryClientProvider client={queryClient}>
        <LoadingScreen 
          isVisible={true}
          message={isGenomeProcessing ? loadingMessage : undefined}
          progress={isGenomeProcessing ? loadingProgress : undefined}
          showProgress={isGenomeProcessing && loadingProgress > 0}
        />
      </QueryClientProvider>
    );
  }
  
  
  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          
          {/* Protected Routes with SideNav Layout */}
          <Route path="/" element={
            <ProtectedRoute>
              <DoctorLayout />
            </ProtectedRoute>
          }>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="patients" element={<PatientListPage />} />
            <Route path="add-patient" element={<AddPatientPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="patient/:patientId" element={<PatientProfilePage />} />
            <Route path="patient/:patientId/pharmacogenomics" element={<PharmacogenomicsPage />} />
            <Route path="patient/:patientId/risk-assessment" element={<RiskAssessmentPage />} />
            <Route path="patient/:patientId/diagnosis" element={<DiagnosisPage />} />
            <Route path="patient/:patientId/timeline" element={<PatientTimelinePage />} />
          </Route>
          
          {/* Fallback routes */}
          <Route path="*" element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/landing" replace />
          } />
        </Routes>
      </HashRouter>
    </QueryClientProvider>
  );
};

export default App;