export interface DiagnosticLead {
  id: string;
  gene: string;
  condition: string;
  classification: 'pathogenic' | 'likely_pathogenic' | 'vus' | 'benign';
  variant: {
    dna: string;
    protein: string;
  };
  evidence: {
    alphaMissense: number;
    clinVar: {
      classification: string;
      stars: number;
    };
    phenotypeMatch: {
      matched: number;
      total: number;
      percentage: number;
    };
  };
  clinicalImpact: {
    contraindications?: string[];
    recommendations?: string[];
    alerts?: ClinicalAlert[];
  };
  literatureCount: number;
  priority: 'high' | 'medium' | 'low';
}

export interface ClinicalAlert {
  type: 'warning' | 'recommendation' | 'info';
  title: string;
  description: string;
  severity: 'critical' | 'moderate' | 'low';
}

export interface GenomicSummary {
  sequencingType: string;
  coverage: string;
  pathogenicCount: number;
  vusCount: number;
  benignCount: number;
}

export interface DiagnosisData {
  patientId: string;
  lastUpdated: string;
  updatedBy: string;
  phenotype: string;
  genomicSummary: GenomicSummary;
  diagnosticLeads: DiagnosticLead[];
}

export type ClassificationLevel = 'pathogenic' | 'likely_pathogenic' | 'vus' | 'benign';