import { DiagnosisData } from '../types/diagnosis.types';

export const mockDiagnosisData: DiagnosisData = {
  patientId: 'CP-9821',
  lastUpdated: '2024-01-15T16:30:00Z',
  updatedBy: 'Dr. Smith',
  phenotype: 'Febrile seizures, Developmental delay, Ataxia, Myoclonic jerks, Photosensitivity',
  genomicSummary: {
    sequencingType: 'Whole Exome Sequencing',
    coverage: '300x',
    pathogenicCount: 2,
    vusCount: 5,
    benignCount: 847
  },
  diagnosticLeads: [
    {
      id: '1',
      gene: 'SCN1A',
      condition: 'Dravet Syndrome',
      classification: 'pathogenic',
      variant: {
        dna: 'c.389T>A',
        protein: 'p.Val130Glu'
      },
      evidence: {
        alphaMissense: 0.98,
        clinVar: {
          classification: 'Pathogenic',
          stars: 2
        },
        phenotypeMatch: {
          matched: 4,
          total: 5,
          percentage: 80
        }
      },
      clinicalImpact: {
        contraindications: [
          'AVOID Sodium Channel Blockers (e.g., Carbamazepine, Lamotrigine). May aggravate seizures.'
        ],
        recommendations: [
          'Consider Valproate, Clobazam, or Stiripentol as first-line therapy.'
        ],
        alerts: [
          {
            type: 'warning',
            title: 'CONTRAINDICATION ALERT',
            description: 'AVOID Sodium Channel Blockers (e.g., Carbamazepine, Lamotrigine). May aggravate seizures.',
            severity: 'critical'
          },
          {
            type: 'recommendation',
            title: 'Treatment Consideration',
            description: 'Consider Valproate, Clobazam, or Stiripentol as first-line therapy.',
            severity: 'moderate'
          }
        ]
      },
      literatureCount: 12,
      priority: 'high'
    },
    {
      id: '2',
      gene: 'GABRA1',
      condition: 'Juvenile Myoclonic Epilepsy',
      classification: 'likely_pathogenic',
      variant: {
        dna: 'c.677G>A',
        protein: 'p.Arg226His'
      },
      evidence: {
        alphaMissense: 0.85,
        clinVar: {
          classification: 'Likely Pathogenic',
          stars: 1
        },
        phenotypeMatch: {
          matched: 3,
          total: 5,
          percentage: 60
        }
      },
      clinicalImpact: {
        recommendations: [
          'Monitor for myoclonic seizures in adolescence.',
          'Consider EEG monitoring for photoparoxysmal response.'
        ]
      },
      literatureCount: 8,
      priority: 'medium'
    },
    {
      id: '3',
      gene: 'KCNQ2',
      condition: 'Benign Familial Neonatal Seizures',
      classification: 'vus',
      variant: {
        dna: 'c.1234C>T',
        protein: 'p.Ala412Val'
      },
      evidence: {
        alphaMissense: 0.45,
        clinVar: {
          classification: 'Uncertain Significance',
          stars: 1
        },
        phenotypeMatch: {
          matched: 2,
          total: 5,
          percentage: 40
        }
      },
      clinicalImpact: {
        recommendations: [
          'Family segregation analysis recommended.',
          'Monitor for seizure patterns consistent with BFNS.'
        ]
      },
      literatureCount: 3,
      priority: 'low'
    }
  ]
};