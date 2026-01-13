import { create } from 'zustand';
import { AddPatientState, PatientFormData, UploadedFile, ProcessingLog, WizardStep } from '../types/addPatient.types';

interface AddPatientStore extends AddPatientState {
  // Actions
  setCurrentStep: (step: WizardStep) => void;
  updateFormData: (data: Partial<PatientFormData>) => void;
  addUploadedFile: (file: UploadedFile) => void;
  updateFileProgress: (fileId: string, progress: number) => void;
  removeFile: (fileId: string) => void;
  addProcessingLog: (log: Omit<ProcessingLog, 'id' | 'timestamp'>) => void;
  setProcessing: (isProcessing: boolean) => void;
  setCompleted: (isCompleted: boolean) => void;
  resetWizard: () => void;
}

const initialState: AddPatientState = {
  currentStep: 'details',
  formData: {
    fullName: '',
    hospitalId: '',
    dateOfBirth: '',
    biologicalSex: '',
    contactNumber: '',
  },
  uploadedFiles: [],
  processingLogs: [],
  isProcessing: false,
  isCompleted: false,
};

export const useAddPatientStore = create<AddPatientStore>((set, get) => ({
  ...initialState,
  
  setCurrentStep: (step) => set({ currentStep: step }),
  
  updateFormData: (data) => set((state) => ({
    formData: { ...state.formData, ...data }
  })),
  
  addUploadedFile: (file) => set((state) => ({
    uploadedFiles: [...state.uploadedFiles, file]
  })),
  
  updateFileProgress: (fileId, progress) => set((state) => ({
    uploadedFiles: state.uploadedFiles.map(file =>
      file.id === fileId ? { ...file, progress } : file
    )
  })),
  
  removeFile: (fileId) => set((state) => ({
    uploadedFiles: state.uploadedFiles.filter(file => file.id !== fileId)
  })),
  
  addProcessingLog: (log) => set((state) => ({
    processingLogs: [...state.processingLogs, {
      ...log,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date()
    }]
  })),
  
  setProcessing: (isProcessing) => set({ isProcessing }),
  setCompleted: (isCompleted) => set({ isCompleted }),
  
  resetWizard: () => set(initialState),
}));