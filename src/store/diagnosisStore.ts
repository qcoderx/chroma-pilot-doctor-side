import { create } from 'zustand';
import { DiagnosisData } from '../types/diagnosis.types';

interface DiagnosisStore {
  diagnosisData: DiagnosisData | null;
  phenotypeInput: string;
  isSearching: boolean;
  expandedLeads: Set<string>;
  
  // Actions
  setDiagnosisData: (data: DiagnosisData) => void;
  setPhenotypeInput: (input: string) => void;
  setSearching: (searching: boolean) => void;
  toggleLeadExpansion: (leadId: string) => void;
  searchGenome: (phenotype: string) => Promise<void>;
}

export const useDiagnosisStore = create<DiagnosisStore>((set, get) => ({
  diagnosisData: null,
  phenotypeInput: '',
  isSearching: false,
  expandedLeads: new Set(),

  setDiagnosisData: (data) => set({ diagnosisData: data }),
  
  setPhenotypeInput: (input) => set({ phenotypeInput: input }),
  
  setSearching: (searching) => set({ isSearching: searching }),
  
  toggleLeadExpansion: (leadId) => {
    const { expandedLeads } = get();
    const newExpanded = new Set(expandedLeads);
    if (newExpanded.has(leadId)) {
      newExpanded.delete(leadId);
    } else {
      newExpanded.add(leadId);
    }
    set({ expandedLeads: newExpanded });
  },
  
  searchGenome: async (phenotype) => {
    set({ isSearching: true });
    
    // Simulate genome search
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Update phenotype in diagnosis data
    const { diagnosisData } = get();
    if (diagnosisData) {
      set({
        diagnosisData: {
          ...diagnosisData,
          phenotype,
          lastUpdated: new Date().toISOString()
        },
        isSearching: false
      });
    }
  }
}));