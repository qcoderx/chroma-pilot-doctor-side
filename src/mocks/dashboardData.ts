import { DashboardData, Patient, ClinicalAlert, DashboardMetrics, SystemStatus } from '../types/dashboard.types';

const mockMetrics: DashboardMetrics = {
  totalPatients: 1247,
  activeAlerts: 23,
  criticalAlerts: 4,
  genomesProcessed: 156,
  pendingReviews: 12,
  systemHealth: 'Healthy'
};

const mockPatients: Patient[] = [
  {
    id: 'CH-4922',
    name: 'Adebayo Ogundimu',
    initials: 'AO',
    patientNumber: 'CH-4922',
    condition: 'Hereditary Breast Cancer Risk',
    riskLevel: 'Critical',
    lastVisit: new Date('2024-01-15'),
    nextAppointment: new Date('2024-02-15'),
    genomicProfile: {
      variants: [
        {
          id: 'var-001',
          gene: 'BRCA1',
          variant: 'c.5266dupC',
          classification: 'Pathogenic',
          clinicalSignificance: 'High penetrance breast/ovarian cancer predisposition',
          alphamissenseScore: 0.95
        }
      ],
      riskScores: [
        {
          condition: 'Breast Cancer',
          score: 87,
          percentile: 95,
          category: 'High'
        }
      ],
      pharmacogenomics: [
        {
          drug: 'Tamoxifen',
          gene: 'CYP2D6',
          phenotype: 'Normal Metabolizer',
          recommendation: 'Standard dosing',
          evidenceLevel: 'A'
        }
      ]
    }
  },
  {
    id: 'CH-3321',
    name: 'Chioma Nwankwo',
    initials: 'CN',
    patientNumber: 'CH-3321',
    condition: 'Long QT Syndrome',
    riskLevel: 'Moderate',
    lastVisit: new Date('2024-01-12'),
    genomicProfile: {
      variants: [
        {
          id: 'var-002',
          gene: 'KCNH2',
          variant: 'c.2690A>G',
          classification: 'Likely Pathogenic',
          clinicalSignificance: 'Long QT syndrome type 2 predisposition'
        }
      ],
      riskScores: [
        {
          condition: 'Cardiac Arrhythmia',
          score: 65,
          percentile: 78,
          category: 'Moderate'
        }
      ],
      pharmacogenomics: [
        {
          drug: 'Ondansetron',
          gene: 'KCNH2',
          phenotype: 'Increased Risk',
          recommendation: 'Avoid or use alternative',
          evidenceLevel: 'B'
        }
      ]
    }
  },
  {
    id: 'CH-5829',
    name: 'Emeka Okoro',
    initials: 'EO',
    patientNumber: 'CH-5829',
    condition: 'Warfarin Sensitivity',
    riskLevel: 'Stable',
    lastVisit: new Date('2024-01-10'),
    genomicProfile: {
      variants: [
        {
          id: 'var-003',
          gene: 'CYP2C9',
          variant: '*3/*3',
          classification: 'Pathogenic',
          clinicalSignificance: 'Poor metabolizer phenotype'
        }
      ],
      riskScores: [
        {
          condition: 'Bleeding Risk',
          score: 45,
          percentile: 60,
          category: 'Moderate'
        }
      ],
      pharmacogenomics: [
        {
          drug: 'Warfarin',
          gene: 'CYP2C9',
          phenotype: 'Poor Metabolizer',
          recommendation: 'Reduce dose by 50-75%',
          evidenceLevel: 'A'
        }
      ]
    }
  },
  {
    id: 'CH-7834',
    name: 'Olumide Fashola',
    initials: 'OF',
    patientNumber: 'CH-7834',
    condition: 'Kidney Disease Risk',
    riskLevel: 'Moderate',
    lastVisit: new Date('2024-01-08'),
    genomicProfile: {
      variants: [
        {
          id: 'var-004',
          gene: 'APOL1',
          variant: 'G1/G2',
          classification: 'Pathogenic',
          clinicalSignificance: 'High-risk genotype for kidney disease'
        }
      ],
      riskScores: [
        {
          condition: 'Chronic Kidney Disease',
          score: 72,
          percentile: 85,
          category: 'High'
        }
      ],
      pharmacogenomics: []
    }
  }
];

const mockAlerts: ClinicalAlert[] = [
  {
    id: 'alert-001',
    patientId: 'CH-4922',
    patientName: 'Adebayo Ogundimu',
    title: 'BRCA1 Pathogenic Variant Detected',
    description: 'High-penetrance variant requiring immediate genetic counseling and enhanced screening protocol',
    severity: 'Critical',
    category: 'Disease Risk',
    timestamp: new Date('2024-01-15T14:30:00'),
    status: 'Active',
    actionRequired: true
  },
  {
    id: 'alert-002',
    patientId: 'CH-5829',
    patientName: 'Emeka Okoro',
    title: 'Warfarin Dosing Alert',
    description: 'CYP2C9 poor metabolizer - requires significant dose reduction to prevent bleeding',
    severity: 'High',
    category: 'Pharmacogenomics',
    timestamp: new Date('2024-01-15T13:15:00'),
    status: 'Active',
    actionRequired: true
  },
  {
    id: 'alert-003',
    patientId: 'CH-3321',
    patientName: 'Chioma Nwankwo',
    title: 'QT-Prolonging Drug Interaction',
    description: 'KCNH2 variant increases risk with ondansetron - consider alternative antiemetic',
    severity: 'Medium',
    category: 'Drug Interaction',
    timestamp: new Date('2024-01-15T12:00:00'),
    status: 'Active',
    actionRequired: true
  },
  {
    id: 'alert-004',
    patientId: 'CH-9156',
    patientName: 'Funmi Okafor',
    title: 'Genome Sequencing Complete',
    description: 'WGS analysis completed - 3 actionable variants identified requiring clinical review',
    severity: 'Low',
    category: 'Laboratory',
    timestamp: new Date('2024-01-15T10:45:00'),
    status: 'Active',
    actionRequired: false
  }
];

const mockSystemStatus: SystemStatus = {
  sequencingPipeline: 'Online',
  analysisEngine: 'Online',
  database: 'Online',
  lastUpdate: new Date('2024-01-15T15:00:00')
};

export const mockDashboardData: DashboardData = {
  metrics: mockMetrics,
  recentPatients: mockPatients,
  activeAlerts: mockAlerts,
  systemStatus: mockSystemStatus
};

export const simulateApiDelay = (ms: number = 800): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};