import { useQuery } from '@tanstack/react-query';
import { RiskAssessmentData } from '../types/riskAssessment.types';
import { mockRiskAssessmentData } from '../mocks/riskAssessmentData';

const fetchRiskAssessmentData = async (patientId: string): Promise<RiskAssessmentData> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 700));
  
  // Simulate potential error
  if (Math.random() < 0.03) {
    throw new Error('Failed to fetch risk assessment data');
  }
  
  return mockRiskAssessmentData;
};

export const useRiskAssessmentData = (patientId: string) => {
  return useQuery({
    queryKey: ['riskAssessment', patientId],
    queryFn: () => fetchRiskAssessmentData(patientId),
    staleTime: 15 * 60 * 1000, // 15 minutes
    retry: 2,
  });
};