import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Patient } from '../types/patients.types';
import { mockPatients } from '../mocks/patientsData';

interface GlobalPatientStore {
  patients: Patient[];
  addPatient: (patient: Patient) => void;
  updatePatient: (patientId: string, updates: Partial<Patient>) => void;
  getPatientById: (patientId: string) => Patient | undefined;
  getPatientStats: () => {
    total: number;
    highRisk: number;
    criticalAlerts: number;
    recentlyAdded: number;
  };
}

export const useGlobalPatientStore = create<GlobalPatientStore>()(
  persist(
    (set, get) => ({
      patients: mockPatients,
      
      addPatient: (patient) => set((state) => ({
        patients: [patient, ...state.patients]
      })),
      
      updatePatient: (patientId, updates) => set((state) => ({
        patients: state.patients.map(patient =>
          patient.id === patientId ? { ...patient, ...updates } : patient
        )
      })),
      
      getPatientById: (patientId) => {
        const state = get();
        return state.patients.find(patient => patient.id === patientId);
      },
      
      getPatientStats: () => {
        const state = get();
        const patients = state.patients;
        
        return {
          total: patients.length,
          highRisk: patients.filter(p => p.riskLevel === 'High' || p.riskLevel === 'Critical').length,
          criticalAlerts: patients.filter(p => p.riskLevel === 'Critical').length,
          recentlyAdded: patients.filter(p => {
            const addedDate = new Date(p.lastVisit);
            const weekAgo = new Date();
            weekAgo.setDate(weekAgo.getDate() - 7);
            return addedDate > weekAgo;
          }).length
        };
      }
    }),
    {
      name: 'chroma-pilot-patients',
      partialize: (state) => ({ patients: state.patients }),
    }
  )
);