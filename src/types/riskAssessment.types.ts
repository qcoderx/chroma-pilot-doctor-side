export interface RiskFactor {
  id: string;
  type: 'genetic' | 'environmental' | 'lifestyle';
  name: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface RiskCondition {
  id: string;
  name: string;
  category: string;
  riskLevel: 'low' | 'moderate' | 'high' | 'critical';
  lifetimeRisk?: number;
  timeframeRisk?: {
    value: number;
    timeframe: string;
  };
  populationAverage: number;
  patientScore: number;
  description: string;
  factors: RiskFactor[];
  clinicalAction?: string;
  secondHit?: {
    detected: boolean;
    description: string;
  };
  recommendations: string[];
}

export interface RiskAssessmentData {
  patientId: string;
  lastUpdated: string;
  conditions: RiskCondition[];
  totalConditionsAnalyzed: number;
}

export type RiskLevel = 'low' | 'moderate' | 'high' | 'critical';
export type RiskFilterType = RiskLevel | 'all';