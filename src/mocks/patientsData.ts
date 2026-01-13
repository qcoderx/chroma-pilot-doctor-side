import { Patient } from '../types/patients.types';

export const mockPatients: Patient[] = [
  {
    id: 'CP-9921',
    name: 'Sarah Jenkins',
    patientNumber: 'CP-9921',
    age: 45,
    sex: 'F',
    riskLevel: 'High Risk',
    genomeStatus: 'Sequenced',
    admittedDate: new Date('2023-10-24'),
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtAfPLWk7XBXIomxl2X9bRgfrOIRJz7-rPMtvGiAna92ChR-5i_10yOae7a2X3LJ3qYC9ZgWeYU2WXjV43NynXzGmUwPykAbuYbEkqECVfCwRBkUASYGgqcvvBzjuuv9QnrlopOz1kUJ_7Quincv8MRJ63T82N0qKljZ1fcm8Od3vONx9rr2KPuP_cnZbw5Arm8FmWHWooEMNg-XIDiLE3k0bJyR2aycD0d0J8wonVps6-6L-me2voyQdDzh-OuZLPFLplrPpgElY'
  },
  {
    id: 'CP-3321',
    name: 'Michael Ross',
    patientNumber: 'CP-3321',
    age: 62,
    sex: 'M',
    riskLevel: 'Low Risk',
    genomeStatus: 'Processing',
    admittedDate: new Date('2023-10-22'),
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNnHdhW5e-cI7dw6MOycPvhqZfefyw0w28w8Lii50kBZBryZZEDhdpFT3D_2NcglQ4lywTWSimmZgVeeuN9sRHA6xcA-5Ne0wCXrCyUp1dIC4eY5PcPMqrNzm4tlWrma8hNxdiBe6AS8lKbnLqXvmmaYdfUTrI20-D1gcvBphEQbkKz54gXd-Xiu7RGqbHdbVbzDMOwiV1n9HnUf-P5acU67HcjvMsjDSCfi3M5pZwV1lmSvFEK0amQxycYQ_UxN1VW4yGSxZZp2U'
  },
  {
    id: 'CP-4582',
    name: 'Elena Rodriguez',
    patientNumber: 'CP-4582',
    age: 34,
    sex: 'F',
    riskLevel: 'Medium Risk',
    genomeStatus: 'Pending',
    admittedDate: new Date('2023-10-20'),
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxe5efwHbiN3AdXt30TxZJMnYF__z8txcEkFOd54A0vUL1o3Bn78Tckxh_jF-avDt92xE6oXHopXs8O5__3T3VE6_K6ZM0I2BsTdLKPlxh-d143BHCLwoDrrWCHHzVNnOFKOJJ_XhrjFtPX-xWWW15hSU65DWkrJO5yAUJA1kinomuw4x7niTdRnWT2h8fbi9dLPmAEFDNaTjgB9BGSladqv4FjqjjRF3de2A4i0EWIsw_UYF9egLcv7tqehs-12ONQvjYjNt1gF0'
  },
  {
    id: 'CP-1029',
    name: 'David Chen',
    patientNumber: 'CP-1029',
    age: 51,
    sex: 'M',
    riskLevel: 'High Risk',
    genomeStatus: 'Sequenced',
    admittedDate: new Date('2023-10-18')
  },
  {
    id: 'CP-7734',
    name: 'Amara Okafor',
    patientNumber: 'CP-7734',
    age: 29,
    sex: 'F',
    riskLevel: 'Low Risk',
    genomeStatus: 'Sequenced',
    admittedDate: new Date('2023-10-15'),
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYD6Jh5wAItons_FVWMuVOGumEoIIhPR7uTysKElX20P_iVHITsuA9TPlmDD_rz8s9MxoNLNuGLntc3nXK-A2lTDqxVtUGELVdrEVPdJdxXiTtbzSjXdUW_u5L3ufizcBdrpjV_uQUSeoZloQSdXcne-OWceQ9nau1Xm-oBiJOQpZrzLX_SkUsF8F1isd21PbkhANwhAtv4E3nHCbAp4PKKGshRuzYVpg4Mov-Gmhc_JfWHkX7u_spQcvdrmT-XnsekEV10ltw2aY'
  }
];

export const simulateApiDelay = (ms: number = 600): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};