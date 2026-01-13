import { useQuery } from '@tanstack/react-query';
import { DiagnosisData } from '../types/diagnosis.types';
import { mockDiagnosisData } from '../mocks/diagnosisData';

const fetchDiagnosisData = async (patientId: string): Promise<DiagnosisData> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  // Simulate potential error
  if (Math.random() < 0.03) {
    throw new Error('Failed to fetch diagnosis data');
  }
  
  return mockDiagnosisData;
};

export const useDiagnosisData = (patientId: string) => {
  return useQuery({
    queryKey: ['diagnosis', patientId],
    queryFn: () => fetchDiagnosisData(patientId),
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });
};