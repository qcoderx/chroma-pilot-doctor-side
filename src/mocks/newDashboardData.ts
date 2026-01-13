import { DashboardData, Patient, ClinicalAlert, DashboardStats } from '../types/newDashboard.types';

const mockStats: DashboardStats = {
  activePatients: 1248,
  activePatientsTrend: 12,
  highRiskAlerts: 14,
  highRiskAlertsTrend: 2,
  genomesProcessed: 89,
  genomesProcessedTrend: 5,
};

const mockPatients: Patient[] = [
  {
    id: 'CH-4922',
    name: 'John Smith',
    initials: 'JS',
    patientNumber: '#4922',
    condition: 'Breast Cancer',
    riskLevel: 'Critical',
    lastVisit: new Date('2024-01-15'),
  },
  {
    id: 'CH-3321',
    name: 'Emily Davis',
    initials: 'ED',
    patientNumber: '#3321',
    condition: "Huntington's",
    riskLevel: 'Moderate',
    lastVisit: new Date('2024-01-12'),
  },
  {
    id: 'CH-5829',
    name: 'Robert Johnson',
    initials: 'RJ',
    patientNumber: '#5829',
    condition: 'Cystic Fibrosis',
    riskLevel: 'Stable',
    lastVisit: new Date('2024-01-10'),
  },
  {
    id: 'CH-2109',
    name: 'Maria Alverez',
    initials: 'MA',
    patientNumber: '#2109',
    condition: 'Lynch Syndrome',
    riskLevel: 'Stable',
    lastVisit: new Date('2024-01-08'),
  },
];

const mockAlerts: ClinicalAlert[] = [
  {
    id: 'alert-001',
    patientId: 'CH-4922',
    patientName: 'John Smith',
    title: 'BRCA1 Variant Detected',
    description: 'High-penetrance variant requiring immediate genetic counseling and enhanced screening protocol',
    severity: 'Critical',
    category: 'Disease Risk',
    timestamp: new Date(Date.now() - 10 * 60 * 1000), // 10 mins ago
    status: 'Active',
    actionRequired: true,
  },
  {
    id: 'alert-002',
    patientId: 'CH-3321',
    patientName: 'Emily Davis',
    title: 'Sample Processing Complete',
    description: 'Genomic analysis completed - review required for treatment planning',
    severity: 'Moderate',
    category: 'Laboratory',
    timestamp: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
    status: 'Active',
    actionRequired: true,
  },
  {
    id: 'alert-003',
    patientId: 'system',
    patientName: 'System',
    title: 'System Update Scheduled',
    description: 'Maintenance tonight at 02:00 AM - expect brief service interruption',
    severity: 'Info',
    category: 'System',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    status: 'Active',
    actionRequired: false,
  },
];

export const mockNewDashboardData: DashboardData = {
  stats: mockStats,
  recentPatients: mockPatients,
  clinicalAlerts: mockAlerts,
};

export const simulateApiDelay = (ms: number = 800): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};