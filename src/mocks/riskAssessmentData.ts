import { RiskAssessmentData } from '../types/riskAssessment.types';

export const mockRiskAssessmentData: RiskAssessmentData = {
  patientId: '88291039',
  lastUpdated: '2024-01-15T14:30:00Z',
  totalConditionsAnalyzed: 47,
  conditions: [
    {
      id: '1',
      name: 'Hereditary Breast and Ovarian Cancer (HBOC)',
      category: 'Oncology',
      riskLevel: 'critical',
      lifetimeRisk: 88,
      populationAverage: 12,
      patientScore: 88,
      description: 'Polygenic Risk Score (PRS) puts patient in the top 1% percentile.',
      factors: [
        {
          id: '1a',
          type: 'genetic',
          name: 'BRCA1 Pathogenic Variant',
          description: 'c.68_69delAG',
          severity: 'critical'
        },
        {
          id: '1b',
          type: 'genetic',
          name: 'rs2981582 (FGFR2)',
          description: 'High Risk Allele',
          severity: 'high'
        },
        {
          id: '1c',
          type: 'environmental',
          name: 'Hormonal Replacement Therapy',
          description: 'History',
          severity: 'medium'
        },
        {
          id: '1d',
          type: 'lifestyle',
          name: 'BMI > 30',
          description: 'Obesity',
          severity: 'medium'
        }
      ],
      clinicalAction: 'Referral to Oncology & Enhanced Screening',
      secondHit: {
        detected: true,
        description: 'The combination of the BRCA1 pathogenic variant and history of hormonal therapy significantly amplifies risk beyond baseline genetic predisposition.'
      },
      recommendations: ['Enhanced screening protocol', 'Genetic counseling', 'Oncology referral']
    },
    {
      id: '2',
      name: 'Type 2 Diabetes',
      category: 'Endocrinology',
      riskLevel: 'moderate',
      timeframeRisk: {
        value: 45,
        timeframe: '5-Year Risk'
      },
      populationAverage: 25,
      patientScore: 45,
      description: 'Elevated polygenic score combined with metabolic markers.',
      factors: [
        {
          id: '2a',
          type: 'genetic',
          name: 'TCF7L2 variants',
          description: 'Present',
          severity: 'medium'
        },
        {
          id: '2b',
          type: 'lifestyle',
          name: 'Sedentary lifestyle',
          description: 'Reported',
          severity: 'medium'
        }
      ],
      recommendations: ['HbA1c monitoring', 'Lifestyle modification', 'Dietary counseling']
    },
    {
      id: '3',
      name: 'Atrial Fibrillation',
      category: 'Cardiology',
      riskLevel: 'low',
      lifetimeRisk: 12,
      populationAverage: 15,
      patientScore: 12,
      description: 'Below population average risk.',
      factors: [
        {
          id: '3a',
          type: 'genetic',
          name: 'Protective variants',
          description: 'Present',
          severity: 'low'
        }
      ],
      recommendations: ['Standard monitoring']
    },
    {
      id: '4',
      name: 'Celiac Disease',
      category: 'Gastroenterology',
      riskLevel: 'low',
      lifetimeRisk: 2,
      populationAverage: 1,
      patientScore: 2,
      description: 'HLA-DQ2/DQ8 not detected.',
      factors: [
        {
          id: '4a',
          type: 'genetic',
          name: 'HLA-DQ2/DQ8',
          description: 'Not detected',
          severity: 'low'
        }
      ],
      recommendations: ['No specific monitoring required']
    }
  ]
};