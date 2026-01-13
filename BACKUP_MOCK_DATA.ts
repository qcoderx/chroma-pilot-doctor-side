// BACKUP OF ALL MOCK DATA AND TYPES - DO NOT DELETE

// Dashboard Types
export interface DashboardStats {
  activePatients: number;
  activePatientsChange: number;
  highRiskAlerts: number;
  highRiskAlertsChange: number;
  genomesProcessed: number;
  genomesProcessedChange: number;
}

export interface Patient {
  id: string;
  name: string;
  initials: string;
  condition: string;
  riskLevel: 'Critical' | 'Moderate' | 'Stable';
  patientNumber: string;
}

export interface ClinicalAlert {
  id: string;
  title: string;
  patient: string;
  patientId: string;
  severity: 'Critical' | 'Moderate' | 'Info';
  timeAgo: string;
  icon: string;
  category: string;
}

export interface DashboardData {
  stats: DashboardStats;
  recentPatients: Patient[];
  clinicalAlerts: ClinicalAlert[];
}

// Mock Dashboard Data
export const mockDashboardData: DashboardData = {
  stats: {
    activePatients: 1248,
    activePatientsChange: 12,
    highRiskAlerts: 14,
    highRiskAlertsChange: 2,
    genomesProcessed: 89,
    genomesProcessedChange: 5
  },
  recentPatients: [
    {
      id: 'CH-4922',
      name: 'Adebayo Ogundimu',
      initials: 'AO',
      condition: 'BRCA1 Pathogenic Variant',
      riskLevel: 'Critical',
      patientNumber: 'CH-4922'
    },
    {
      id: 'CH-3321',
      name: 'Chioma Nwankwo',
      initials: 'CN',
      condition: 'Long QT Syndrome Type 2',
      riskLevel: 'Moderate',
      patientNumber: 'CH-3321'
    },
    {
      id: 'CH-5829',
      name: 'Emeka Okoro',
      initials: 'EO',
      condition: 'CYP2C9 Poor Metabolizer',
      riskLevel: 'Stable',
      patientNumber: 'CH-5829'
    },
    {
      id: 'CH-2109',
      name: 'Kemi Adebayo',
      initials: 'KA',
      condition: 'Lynch Syndrome (MLH1)',
      riskLevel: 'Stable',
      patientNumber: 'CH-2109'
    },
    {
      id: 'CH-7834',
      name: 'Olumide Fashola',
      initials: 'OF',
      condition: 'APOL1 High-Risk Genotype',
      riskLevel: 'Moderate',
      patientNumber: 'CH-7834'
    },
    {
      id: 'CH-9156',
      name: 'Funmi Okafor',
      initials: 'FO',
      condition: 'SCN1A Dravet Syndrome',
      riskLevel: 'Critical',
      patientNumber: 'CH-9156'
    }
  ],
  clinicalAlerts: [
    {
      id: 'alert-1',
      title: 'BRCA1 c.5266dupC Pathogenic Variant',
      patient: 'Adebayo Ogundimu',
      patientId: 'CH-4922',
      severity: 'Critical',
      timeAgo: '10 mins ago',
      icon: 'warning',
      category: 'Hereditary Cancer Risk'
    },
    {
      id: 'alert-2',
      title: 'Drug-Gene Interaction: Warfarin',
      patient: 'Emeka Okoro',
      patientId: 'CH-5829',
      severity: 'Critical',
      timeAgo: '25 mins ago',
      icon: 'medication',
      category: 'Pharmacogenomics'
    },
    {
      id: 'alert-3',
      title: 'KCNH2 Long QT Risk Assessment',
      patient: 'Chioma Nwankwo',
      patientId: 'CH-3321',
      severity: 'Moderate',
      timeAgo: '1 hour ago',
      icon: 'ecg_heart',
      category: 'Cardiac Genetics'
    },
    {
      id: 'alert-4',
      title: 'APOL1 Nephropathy Risk Screening',
      patient: 'Olumide Fashola',
      patientId: 'CH-7834',
      severity: 'Moderate',
      timeAgo: '2 hours ago',
      icon: 'medical_information',
      category: 'Renal Genetics'
    },
    {
      id: 'alert-5',
      title: 'Genome Sequencing Complete',
      patient: 'Funmi Okafor',
      patientId: 'CH-9156',
      severity: 'Info',
      timeAgo: '3 hours ago',
      icon: 'biotech',
      category: 'Laboratory'
    }
  ]
};

// Mock patient search data
export const mockPatientSearchData = [
  {
    id: 'CH-4922',
    name: 'Adebayo Ogundimu',
    initials: 'AO',
    condition: 'BRCA1 Pathogenic Variant',
    riskLevel: 'Critical' as const,
    patientNumber: 'CH-4922'
  },
  {
    id: 'CH-3321',
    name: 'Chioma Nwankwo',
    initials: 'CN',
    condition: 'Long QT Syndrome Type 2',
    riskLevel: 'Moderate' as const,
    patientNumber: 'CH-3321'
  },
  {
    id: 'CH-5829',
    name: 'Emeka Okoro',
    initials: 'EO',
    condition: 'CYP2C9 Poor Metabolizer',
    riskLevel: 'Stable' as const,
    patientNumber: 'CH-5829'
  },
  {
    id: 'CH-2109',
    name: 'Kemi Adebayo',
    initials: 'KA',
    condition: 'Lynch Syndrome (MLH1)',
    riskLevel: 'Stable' as const,
    patientNumber: 'CH-2109'
  },
  {
    id: 'CH-7834',
    name: 'Olumide Fashola',
    initials: 'OF',
    condition: 'APOL1 High-Risk Genotype',
    riskLevel: 'Moderate' as const,
    patientNumber: 'CH-7834'
  },
  {
    id: 'CH-9156',
    name: 'Funmi Okafor',
    initials: 'FO',
    condition: 'SCN1A Dravet Syndrome',
    riskLevel: 'Critical' as const,
    patientNumber: 'CH-9156'
  }
];