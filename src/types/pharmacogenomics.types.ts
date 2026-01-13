export interface DrugInteractionCheck {
  medicationName: string;
  patientId: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  interaction?: DrugInteraction;
}

export interface DrugInteraction {
  id: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  affectedGene: string;
  metabolizerStatus: string;
  alternatives: DrugAlternative[];
  clinicalGuidelines?: string;
}

export interface DrugAlternative {
  name: string;
  status: 'recommended' | 'caution' | 'avoid';
  notes?: string;
}

export interface GeneMetabolizer {
  gene: string;
  fullName: string;
  status: 'poor' | 'intermediate' | 'normal' | 'rapid' | 'ultrarapid';
  genotype: string;
  alphaMissenseScore: number;
  clinicalGuidance: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
}

export interface PharmacogenomicsData {
  patientId: string;
  lastUpdated: string;
  geneMetabolizers: GeneMetabolizer[];
  totalGenesAnalyzed: number;
}

export type MetabolizerStatus = 'poor' | 'intermediate' | 'normal' | 'rapid' | 'ultrarapid';