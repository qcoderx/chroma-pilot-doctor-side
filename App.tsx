import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LoadingScreen } from './src/components/ui/LoadingScreen';
import { useLoadingStore } from './src/store/loadingStore';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import RedZone from './pages/RedZone';
import AllPatients from './pages/AllPatients';
import AddPatient from './pages/AddPatient';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import PatientDetails from './pages/PatientDetails';
import LandingPage from './src/pages/LandingPage';

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
  
  // Simulate initial app loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setAppLoading(false);
    }, 2000); // 2 second initial load
    
    return () => clearTimeout(timer);
  }, [setAppLoading]);
  
  // Show loading screen for app initialization or genome processing
  const shouldShowLoading = isAppLoading || isGenomeProcessing;
  
  return (
    <QueryClientProvider client={queryClient}>
      <LoadingScreen 
        isVisible={shouldShowLoading}
        message={isGenomeProcessing ? loadingMessage : undefined}
        progress={isGenomeProcessing ? loadingProgress : undefined}
        showProgress={isGenomeProcessing && loadingProgress > 0}
      />
      
      <HashRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="red-zone" element={<RedZone />} />
            <Route path="patients" element={<AllPatients />} />
            <Route path="add-patient" element={<AddPatient />} />
            <Route path="patient/:id" element={<PatientDetails />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </QueryClientProvider>
  );
};

export default App;