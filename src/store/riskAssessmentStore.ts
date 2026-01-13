import { create } from 'zustand';
import { RiskAssessmentData, RiskFilterType } from '../types/riskAssessment.types';

interface RiskAssessmentStore {
  riskData: RiskAssessmentData | null;
  searchQuery: string;
  activeFilter: RiskFilterType;
  isLoading: boolean;
  
  // Actions
  setRiskData: (data: RiskAssessmentData) => void;
  setSearchQuery: (query: string) => void;
  setActiveFilter: (filter: RiskFilterType) => void;
  setLoading: (loading: boolean) => void;
}

export const useRiskAssessmentStore = create<RiskAssessmentStore>((set) => ({
  riskData: null,
  searchQuery: '',
  activeFilter: 'all',
  isLoading: false,

  setRiskData: (data) => set({ riskData: data }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setActiveFilter: (filter) => set({ activeFilter: filter }),
  setLoading: (loading) => set({ isLoading: loading })
}));