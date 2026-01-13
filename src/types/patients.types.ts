export interface Patient {
  id: string;
  name: string;
  patientNumber: string;
  age: number;
  sex: 'M' | 'F';
  riskLevel: 'High Risk' | 'Medium Risk' | 'Low Risk';
  genomeStatus: 'Sequenced' | 'Processing' | 'Pending';
  admittedDate: Date;
  avatar?: string;
}

export interface PatientFilters {
  search: string;
  ageFilter: string;
  riskLevel?: string;
  genomeStatus?: string;
}

export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
}