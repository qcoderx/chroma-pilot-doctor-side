import { useQuery } from '@tanstack/react-query';
import { TimelineData } from '../types/timeline.types';
import { mockTimelineData } from '../mocks/timelineData';

const fetchTimelineData = async (patientId: string): Promise<TimelineData> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // In a real app, this would be an API call
  return mockTimelineData;
};

export const useTimeline = (patientId: string) => {
  return useQuery({
    queryKey: ['timeline', patientId],
    queryFn: () => fetchTimelineData(patientId),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};