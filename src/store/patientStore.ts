import { create } from 'zustand';
import { PatientFilters, PaginationState } from '../types/patients.types';

interface PatientStore {
  filters: PatientFilters;
  pagination: PaginationState;
  selectedPatients: string[];
  
  // Actions
  setFilters: (filters: Partial<PatientFilters>) => void;
  setPagination: (pagination: Partial<PaginationState>) => void;
  togglePatientSelection: (patientId: string) => void;
  selectAllPatients: (patientIds: string[]) => void;
  clearSelection: () => void;
}

export const usePatientStore = create<PatientStore>((set, get) => ({
  filters: {
    search: '',
    ageFilter: '',
    riskLevel: undefined,
    genomeStatus: undefined,
  },
  pagination: {
    page: 1,
    pageSize: 10,
    total: 0,
  },
  selectedPatients: [],
  
  setFilters: (newFilters) => set((state) => ({
    filters: { ...state.filters, ...newFilters },
    pagination: { ...state.pagination, page: 1 } // Reset to first page on filter change
  })),
  
  setPagination: (newPagination) => set((state) => ({
    pagination: { ...state.pagination, ...newPagination }
  })),
  
  togglePatientSelection: (patientId) => set((state) => ({
    selectedPatients: state.selectedPatients.includes(patientId)
      ? state.selectedPatients.filter(id => id !== patientId)
      : [...state.selectedPatients, patientId]
  })),
  
  selectAllPatients: (patientIds) => set(() => ({
    selectedPatients: patientIds
  })),
  
  clearSelection: () => set(() => ({
    selectedPatients: []
  })),
}));