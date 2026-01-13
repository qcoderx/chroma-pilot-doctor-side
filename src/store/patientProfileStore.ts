import { create } from 'zustand';
import { PatientProfileData, TabType } from '../types/patientProfile.types';

interface PatientProfileStore {
  currentTab: TabType;
  patientData: PatientProfileData | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setCurrentTab: (tab: TabType) => void;
  setPatientData: (data: PatientProfileData) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  dismissAlert: (alertId: string) => void;
}

export const usePatientProfileStore = create<PatientProfileStore>((set, get) => ({
  currentTab: 'overview',
  patientData: null,
  isLoading: false,
  error: null,

  setCurrentTab: (tab) => set({ currentTab: tab }),
  
  setPatientData: (data) => set({ patientData: data, isLoading: false, error: null }),
  
  setLoading: (loading) => set({ isLoading: loading }),
  
  setError: (error) => set({ error, isLoading: false }),
  
  dismissAlert: (alertId) => {
    const { patientData } = get();
    if (patientData) {
      const updatedAlerts = patientData.alerts.filter(alert => alert.id !== alertId);
      set({
        patientData: {
          ...patientData,
          alerts: updatedAlerts
        }
      });
    }
  }
}));