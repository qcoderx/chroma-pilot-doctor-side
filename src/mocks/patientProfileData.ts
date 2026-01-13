import { PatientProfileData } from '../types/patientProfile.types';

export const mockPatientProfileData: PatientProfileData = {
  profile: {
    id: '992-8841',
    fullName: 'Jane Doe',
    hospitalId: '#992-8841',
    dateOfBirth: '1979-01-01',
    age: 45,
    biologicalSex: 'Female',
    riskLevel: 'High',
    profileImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDENupJmIjbYHG43Je23BvtrfSw0ZUOCqYRCYLT4BFXXts5x4LX9OW02_5U4iZWkZ7xqprGeHAzURhEasdGRGjqU9JNfZDahh95koSYZf5EBa9fSV7bRYLusYRGFAu8fNo29B_Ec1YmEU7EYMkzocLoZlRCiyoDEwHejy-_TeqwwME0eTwS2kNSAX7h04SQsKKIMQEkzNWDLFCCXZ8gdvNPYOYzMXu5MKKl6lTL6KCn95DW2vphMmjdhC8QVJuPy5oHW2lN1laLWEk',
    isAppConnected: true,
    lastAppSync: '2h ago',
    isWholeGenomeSequenced: true
  },
  vitals: {
    weight: { value: 68, unit: 'kg', change: -1.2 },
    height: { value: 170, unit: 'cm' },
    bloodType: 'O+',
    bloodPressure: { systolic: 135, diastolic: 85, status: 'elevated' },
    lastUpdated: 'Updated today, 09:00 AM'
  },
  contact: {
    phone: '+1 (555) 019-2834',
    address: '2464 Royal Ln. Mesa, New Jersey 45463',
    insurance: {
      provider: 'BlueCross BlueShield',
      policyNumber: '#H8992-001'
    },
    primaryPhysician: {
      name: 'Dr. Emily Stone',
      title: 'Primary Care Physician'
    }
  },
  alerts: [
    {
      id: '1',
      type: 'critical',
      title: 'High Risk Drug Interaction Detected',
      description: 'Potential interaction between Warfarin and newly prescribed Simvastatin based on CYP2C9 variants.',
      timestamp: '10 mins ago',
      actions: [
        { label: 'Review Interaction', type: 'primary' },
        { label: 'Dismiss', type: 'secondary' }
      ]
    },
    {
      id: '2',
      type: 'warning',
      title: 'Abnormal Lab Result: Potassium',
      description: 'Potassium level at 5.8 mmol/L. Needs clinical review.',
      timestamp: '2 hours ago'
    },
    {
      id: '3',
      type: 'info',
      title: 'Upcoming Appointment',
      description: 'Routine cardiology follow-up with Dr. Stone.',
      timestamp: 'Tomorrow, 10:00 AM'
    }
  ],
  genomicInsights: [
    {
      gene: 'CYP2D6',
      status: 'Poor Metabolizer',
      risk: 'high',
      description: 'Reduced enzyme activity affecting drug metabolism'
    },
    {
      gene: 'BRCA1',
      status: 'Pathogenic Variant Detected',
      risk: 'high',
      description: 'Increased breast and ovarian cancer risk'
    },
    {
      gene: 'VKORC1',
      status: 'Normal Sensitivity',
      risk: 'low',
      description: 'Standard warfarin dosing recommended'
    }
  ],
  medications: [
    { name: 'Lisinopril', dosage: '10mg daily' },
    { name: 'Metformin', dosage: '500mg bid' },
    { name: 'Aspirin', dosage: '81mg daily' },
    { name: 'Simvastatin', dosage: '20mg', hasAlert: true }
  ]
};