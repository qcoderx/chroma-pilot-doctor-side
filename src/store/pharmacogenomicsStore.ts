import { create } from 'zustand';
import { DrugInteractionCheck, DrugInteraction, PharmacogenomicsData } from '../types/pharmacogenomics.types';

interface PharmacogenomicsStore {
  pharmacogenomicsData: PharmacogenomicsData | null;
  currentDrugCheck: DrugInteractionCheck | null;
  isCheckingDrug: boolean;
  selectedMedication: string;
  
  // Actions
  setPharmacogenomicsData: (data: PharmacogenomicsData) => void;
  setSelectedMedication: (medication: string) => void;
  checkDrugInteraction: (medication: string, patientId: string) => Promise<void>;
  clearDrugCheck: () => void;
}

export const usePharmacogenomicsStore = create<PharmacogenomicsStore>((set, get) => ({
  pharmacogenomicsData: null,
  currentDrugCheck: null,
  isCheckingDrug: false,
  selectedMedication: '',

  setPharmacogenomicsData: (data) => set({ pharmacogenomicsData: data }),
  
  setSelectedMedication: (medication) => set({ selectedMedication: medication }),
  
  checkDrugInteraction: async (medication, patientId) => {
    set({ isCheckingDrug: true });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock interaction check - Codeine example
    if (medication.toLowerCase().includes('codeine')) {
      const interaction: DrugInteraction = {
        id: '1',
        severity: 'critical',
        title: 'CRITICAL INTERACTION DETECTED',
        description: 'Patient is a CYP2D6 Poor Metabolizer. Codeine will not be effectively converted to its active metabolite (Morphine), resulting in lack of analgesic efficacy.',
        affectedGene: 'CYP2D6',
        metabolizerStatus: 'Poor Metabolizer',
        alternatives: [
          { name: 'Oxycodone', status: 'recommended' },
          { name: 'Tramadol', status: 'caution', notes: 'Use Caution' },
          { name: 'Morphine', status: 'recommended' }
        ]
      };
      
      set({
        currentDrugCheck: {
          medicationName: medication,
          patientId,
          riskLevel: 'critical',
          interaction
        },
        isCheckingDrug: false
      });
    } else {
      set({
        currentDrugCheck: {
          medicationName: medication,
          patientId,
          riskLevel: 'low'
        },
        isCheckingDrug: false
      });
    }
  },
  
  clearDrugCheck: () => set({ currentDrugCheck: null })
}));