import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Mock API functions (replace with actual API calls)
const mockAPI = {
  submitEmail: async (email: string): Promise<{ success: boolean; message: string }> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate success/failure
    if (Math.random() > 0.1) {
      return { success: true, message: 'Email submitted successfully' };
    } else {
      throw new Error('Failed to submit email');
    }
  },
  
  getStats: async (): Promise<{ sequences: number; accuracy: number; avgTime: number }> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      sequences: 50000,
      accuracy: 99.9,
      avgTime: 15
    };
  }
};

// Email submission hook
export const useSubmitEmail = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: mockAPI.submitEmail,
    onSuccess: () => {
      // Invalidate and refetch any related queries
      queryClient.invalidateQueries({ queryKey: ['email-submissions'] });
    },
    onError: (error) => {
      console.error('Email submission failed:', error);
    }
  });
};

// Stats fetching hook
export const useStats = () => {
  return useQuery({
    queryKey: ['landing-stats'],
    queryFn: mockAPI.getStats,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false
  });
};

// Demo request hook
export const useRequestDemo = () => {
  return useMutation({
    mutationFn: async (data: { email: string; company?: string; message?: string }) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { success: true, demoId: `demo-${Date.now()}` };
    },
    onError: (error) => {
      console.error('Demo request failed:', error);
    }
  });
};