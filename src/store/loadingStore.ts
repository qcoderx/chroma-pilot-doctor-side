import { create } from 'zustand';

interface LoadingState {
  // Global loading states
  isAppLoading: boolean;
  isRouteLoading: boolean;
  isGenomeProcessing: boolean;
  
  // Loading messages and progress
  loadingMessage: string;
  loadingProgress: number;
  
  // Actions
  setAppLoading: (loading: boolean) => void;
  setRouteLoading: (loading: boolean) => void;
  setGenomeProcessing: (loading: boolean, message?: string, progress?: number) => void;
  setLoadingMessage: (message: string) => void;
  setLoadingProgress: (progress: number) => void;
  clearLoading: () => void;
}

export const useLoadingStore = create<LoadingState>((set) => ({
  // Initial state
  isAppLoading: true, // Start with app loading
  isRouteLoading: false,
  isGenomeProcessing: false,
  loadingMessage: '',
  loadingProgress: 0,
  
  // Actions
  setAppLoading: (loading) => set({ isAppLoading: loading }),
  
  setRouteLoading: (loading) => set({ isRouteLoading: loading }),
  
  setGenomeProcessing: (loading, message = '', progress = 0) => set({
    isGenomeProcessing: loading,
    loadingMessage: message,
    loadingProgress: progress
  }),
  
  setLoadingMessage: (message) => set({ loadingMessage: message }),
  
  setLoadingProgress: (progress) => set({ loadingProgress: progress }),
  
  clearLoading: () => set({
    isAppLoading: false,
    isRouteLoading: false,
    isGenomeProcessing: false,
    loadingMessage: '',
    loadingProgress: 0
  })
}));