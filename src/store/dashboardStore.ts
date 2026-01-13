import { create } from 'zustand';
import { DashboardData, ClinicalAlert } from '../types/dashboard.types';

interface DashboardState {
  data: DashboardData | null;
  isLoading: boolean;
  error: string | null;
  selectedAlert: ClinicalAlert | null;
  searchQuery: string;
  
  // Actions
  setData: (data: DashboardData) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSelectedAlert: (alert: ClinicalAlert | null) => void;
  setSearchQuery: (query: string) => void;
  acknowledgeAlert: (alertId: string) => void;
  resolveAlert: (alertId: string) => void;
}

export const useDashboardStore = create<DashboardState>((set, get) => ({
  data: null,
  isLoading: false,
  error: null,
  selectedAlert: null,
  searchQuery: '',
  
  setData: (data) => set({ data }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setSelectedAlert: (selectedAlert) => set({ selectedAlert }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  
  acknowledgeAlert: (alertId) => {
    const { data } = get();
    if (!data) return;
    
    const updatedAlerts = data.activeAlerts.map(alert => 
      alert.id === alertId ? { ...alert, status: 'Acknowledged' as const } : alert
    );
    
    set({ 
      data: { 
        ...data, 
        activeAlerts: updatedAlerts 
      } 
    });
  },
  
  resolveAlert: (alertId) => {
    const { data } = get();
    if (!data) return;
    
    const updatedAlerts = data.activeAlerts.map(alert => 
      alert.id === alertId ? { ...alert, status: 'Resolved' as const } : alert
    );
    
    set({ 
      data: { 
        ...data, 
        activeAlerts: updatedAlerts 
      } 
    });
  }
}));