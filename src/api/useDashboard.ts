import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { DashboardData, Patient, ClinicalAlert } from '../types/dashboard.types';
import { mockDashboardData, simulateApiDelay } from '../mocks/dashboardData';
import { useGlobalPatientStore } from '../store/globalPatientStore';

// Dashboard data fetching
export const useDashboardData = () => {
  return useQuery<DashboardData, Error>({
    queryKey: ['dashboard'],
    queryFn: async (): Promise<DashboardData> => {
      await simulateApiDelay(800);
      return mockDashboardData;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 30 * 1000, // 30 seconds for real-time updates
  });
};

// Patient search
export const usePatientSearch = (query: string) => {
  return useQuery<Patient[], Error>({
    queryKey: ['patients', 'search', query],
    queryFn: async (): Promise<Patient[]> => {
      if (!query || query.length < 2) return [];
      
      await simulateApiDelay(300);
      
      const searchTerm = query.toLowerCase();
      return mockDashboardData.recentPatients.filter(patient => 
        patient.name.toLowerCase().includes(searchTerm) ||
        patient.patientNumber.toLowerCase().includes(searchTerm) ||
        patient.condition.toLowerCase().includes(searchTerm)
      ).slice(0, 5);
    },
    enabled: query.length >= 2,
    staleTime: 2 * 60 * 1000,
  });
};

// Alert management
export const useAcknowledgeAlert = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (alertId: string): Promise<void> => {
      await simulateApiDelay(500);
      // Simulate API call
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
};

export const useResolveAlert = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (alertId: string): Promise<void> => {
      await simulateApiDelay(500);
      // Simulate API call
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
};

// Patient details
export const usePatientDetails = (patientId: string) => {
  return useQuery<Patient, Error>({
    queryKey: ['patient', patientId],
    queryFn: async (): Promise<Patient> => {
      await simulateApiDelay(600);
      
      const patient = mockDashboardData.recentPatients.find(p => p.id === patientId);
      if (!patient) {
        throw new Error('Patient not found');
      }
      
      return patient;
    },
    enabled: !!patientId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};