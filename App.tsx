import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import RedZone from './pages/RedZone';
import AllPatients from './pages/AllPatients';
import AddPatient from './pages/AddPatient';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import PatientDetails from './pages/PatientDetails';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="red-zone" element={<RedZone />} />
          <Route path="patients" element={<AllPatients />} />
          <Route path="add-patient" element={<AddPatient />} />
          <Route path="patient/:id" element={<PatientDetails />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;