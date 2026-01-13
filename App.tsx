import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LoadingScreen } from './src/components/ui/LoadingScreen';
import { ProtectedRoute } from './src/components/auth/ProtectedRoute';
import { useLoadingStore } from './src/store/loadingStore';
import { useAuthStore } from './src/store/authStore';

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
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          
          {/* Protected Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } />
          
          <Route path="/patients" element={
            <ProtectedRoute>
              <PatientListPage />
            </ProtectedRoute>
          } />
          
          <Route path="/add-patient" element={
            <ProtectedRoute>
              <AddPatientPage />
            </ProtectedRoute>
          } />
          
          <Route path="/analytics" element={
            <ProtectedRoute>
              <AnalyticsPage />
            </ProtectedRoute>
          } />
          
          {/* Patient-specific routes */}
          <Route path="/patient/:patientId" element={
            <ProtectedRoute>
              <PatientProfilePage />
            </ProtectedRoute>
          } />
          
          <Route path="/patient/:patientId/pharmacogenomics" element={
            <ProtectedRoute>
              <PharmacogenomicsPage />
            </ProtectedRoute>
          } />
          
          <Route path="/patient/:patientId/risk-assessment" element={
            <ProtectedRoute>
              <RiskAssessmentPage />
            </ProtectedRoute>
          } />
          
          <Route path="/patient/:patientId/diagnosis" element={
            <ProtectedRoute>
              <DiagnosisPage />
            </ProtectedRoute>
          } />
          
          <Route path="/patient/:patientId/timeline" element={
            <ProtectedRoute>
              <PatientTimelinePage />
            </ProtectedRoute>
          } />
          
          {/* Fallback routes */}
          <Route path="*" element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/" replace />
          } />
        </Routes>
      </HashRouter>
    </QueryClientProvider>
  );
};

export default App;