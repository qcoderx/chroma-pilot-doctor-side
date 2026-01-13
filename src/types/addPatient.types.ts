export interface PatientFormData {
  fullName: string;
  hospitalId: string;
  dateOfBirth: string;
  age?: number;
  biologicalSex: 'Male' | 'Female' | 'Intersex' | '';
  contactNumber?: string;
}

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
}

export interface ProcessingLog {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
  timestamp: Date;
}

export type WizardStep = 'details' | 'upload' | 'processing';

export interface AddPatientState {
  currentStep: WizardStep;
  formData: PatientFormData;
  uploadedFiles: UploadedFile[];
  processingLogs: ProcessingLog[];
  isProcessing: boolean;
  isCompleted: boolean;
}