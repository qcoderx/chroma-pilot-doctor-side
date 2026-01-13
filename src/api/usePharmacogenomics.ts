import { useQuery } from '@tanstack/react-query';
import { PharmacogenomicsData } from '../types/pharmacogenomics.types';
import { mockPharmacogenomicsData } from '../mocks/pharmacogenomicsData';

const fetchPharmacogenomicsData = async (patientId: string): Promise<PharmacogenomicsData> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  // Simulate potential error
  if (Math.random() < 0.03) {
    throw new Error('Failed to fetch pharmacogenomics data');
  }
  
  return mockPharmacogenomicsData;
};

export const usePharmacogenomicsData = (patientId: string) => {
  return useQuery({
    queryKey: ['pharmacogenomics', patientId],
    queryFn: () => fetchPharmacogenomicsData(patientId),
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });
};