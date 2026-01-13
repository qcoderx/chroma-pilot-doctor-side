import { useQuery } from '@tanstack/react-query';
import { PatientProfileData } from '../types/patientProfile.types';
import { mockPatientProfileData } from '../mocks/patientProfileData';
import { useGlobalPatientStore } from '../store/globalPatientStore';

const fetchPatientProfile = async (patientId: string, getPatientById: (id: string) => any): Promise<PatientProfileData> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // For demo, always return mock data regardless of patient ID
  return {
    ...mockPatientProfileData,
    profile: {
      ...mockPatientProfileData.profile,
      id: patientId,
      fullName: 'Adunni Okafor',
      hospitalId: patientId,
      age: 34,
      biologicalSex: 'Female',
      riskLevel: 'High',
      isWholeGenomeSequenced: true
    }
  };
};

export const usePatientProfile = (patientId: string) => {
  const { getPatientById } = useGlobalPatientStore();
  
  return useQuery({
    queryKey: ['patientProfile', patientId],
    queryFn: () => fetchPatientProfile(patientId, getPatientById),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
};