import { useQuery } from '@tanstack/react-query';
import { DashboardData } from '../types/newDashboard.types';
import { mockNewDashboardData, simulateApiDelay } from '../mocks/newDashboardData';

export const useNewDashboardData = () => {
  return useQuery<DashboardData, Error>({
    queryKey: ['newDashboard'],
    queryFn: async (): Promise<DashboardData> => {
      await simulateApiDelay(600);
      return mockNewDashboardData;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 30 * 1000, // 30 seconds for real-time updates
  });
};