import { PharmacogenomicsData } from '../types/pharmacogenomics.types';

export const mockPharmacogenomicsData: PharmacogenomicsData = {
  patientId: '992831',
  lastUpdated: '2024-01-15T10:30:00Z',
  totalGenesAnalyzed: 28,
  geneMetabolizers: [
    {
      gene: 'CYP2D6',
      fullName: 'Cytochrome P450 2D6',
      status: 'poor',
      genotype: '*4/*4',
      alphaMissenseScore: 0.92,
      clinicalGuidance: 'Avoid codeine; consider alternatives. Reduced metabolism of CYP2D6 substrates.',
      riskLevel: 'critical'
    },
    {
      gene: 'CYP2C19',
      fullName: 'Cytochrome P450 2C19',
      status: 'normal',
      genotype: '*1/*1',
      alphaMissenseScore: 0.12,
      clinicalGuidance: 'Standard dosing recommended. No specific genetic restrictions found.',
      riskLevel: 'low'
    },
    {
      gene: 'SLCO1B1',
      fullName: 'Solute Carrier Organic Anion',
      status: 'intermediate',
      genotype: '*1/*5',
      alphaMissenseScore: 0.45,
      clinicalGuidance: 'Reduced transporter function. Monitor for myopathy when prescribing statins.',
      riskLevel: 'medium'
    },
    {
      gene: 'CYP2C9',
      fullName: 'Cytochrome P450 2C9',
      status: 'rapid',
      genotype: '*1/*17',
      alphaMissenseScore: 0.78,
      clinicalGuidance: 'Increased metabolism. Higher doses may be required for efficacy.',
      riskLevel: 'medium'
    },
    {
      gene: 'VKORC1',
      fullName: 'Vitamin K Epoxide Reductase Complex',
      status: 'normal',
      genotype: 'GG',
      alphaMissenseScore: 0.23,
      clinicalGuidance: 'Standard warfarin dosing. Normal vitamin K sensitivity.',
      riskLevel: 'low'
    },
    {
      gene: 'DPYD',
      fullName: 'Dihydropyrimidine Dehydrogenase',
      status: 'intermediate',
      genotype: '*1/*2A',
      alphaMissenseScore: 0.67,
      clinicalGuidance: 'Reduced 5-FU metabolism. Consider dose reduction for fluoropyrimidines.',
      riskLevel: 'high'
    }
  ]
};