export interface PatientProfile {
  id: string;
  fullName: string;
  hospitalId: string;
  dateOfBirth: string;
  age: number;
  biologicalSex: 'Male' | 'Female' | 'Intersex';
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  profileImage?: string;
  isAppConnected: boolean;
  lastAppSync?: string;
  isWholeGenomeSequenced: boolean;
}

export interface PatientVitals {
  weight: { value: number; unit: string; change?: number };
  height: { value: number; unit: string };
  bloodType: string;
  bloodPressure: { systolic: number; diastolic: number; status: 'normal' | 'elevated' | 'high' };
  lastUpdated: string;
}

export interface PatientContact {
  phone: string;
  address: string;
  insurance: {
    provider: string;
    policyNumber: string;
  };
  primaryPhysician: {
    name: string;
    title: string;
  };
}

export interface ClinicalAlert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  timestamp: string;
  actions?: Array<{
    label: string;
    type: 'primary' | 'secondary';
  }>;
}

export interface GenomicInsight {
  gene: string;
  status: string;
  risk: 'low' | 'medium' | 'high';
  description: string;
}

export interface Medication {
  name: string;
  dosage: string;
  hasAlert?: boolean;
}

export interface PatientProfileData {
  profile: PatientProfile;
  vitals: PatientVitals;
  contact: PatientContact;
  alerts: ClinicalAlert[];
  genomicInsights: GenomicInsight[];
  medications: Medication[];
}

export type TabType = 'overview' | 'pharmacogenomics' | 'risk' | 'diagnosis' | 'timeline' | 'telemetry' | 'reports';