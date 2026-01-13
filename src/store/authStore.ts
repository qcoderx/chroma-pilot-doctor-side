import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, User } from '../types/auth.types';

interface AuthStore extends AuthState {
  login: (user: User, token: string) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: (user: User, token: string) => {
        // Store token in a way that would work with your backend
        // For now, we'll just store user data
        set({
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      setError: (error: string | null) => {
        set({ error, isLoading: false });
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'chroma-pilot-auth',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);