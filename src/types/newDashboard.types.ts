export interface DashboardStats {
  activePatients: number;
  activePatientsTrend: number;
  highRiskAlerts: number;
  highRiskAlertsTrend: number;
  genomesProcessed: number;
  genomesProcessedTrend: number;
}

export interface Patient {
  id: string;
  name: string;
  initials: string;
  patientNumber: string;
  condition: string;
  riskLevel: 'Critical' | 'Moderate' | 'Stable';
  lastVisit?: Date;
  nextAppointment?: Date;
}

export interface ClinicalAlert {
  id: string;
  patientId: string;
  patientName: string;
  title: string;
  description: string;
  severity: 'Critical' | 'Moderate' | 'Info';
  category: 'Disease Risk' | 'Pharmacogenomics' | 'Drug Interaction' | 'Laboratory' | 'System';
  timestamp: Date;
  status: 'Active' | 'Acknowledged' | 'Resolved';
  actionRequired: boolean;
}

export interface DashboardData {
  stats: DashboardStats;
  recentPatients: Patient[];
  clinicalAlerts: ClinicalAlert[];
}