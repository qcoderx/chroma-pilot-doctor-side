import { create } from 'zustand';
import { EmailSignupForm } from '../types/landing.types';

interface LandingStore {
  // Email signup state
  emailForm: EmailSignupForm;
  isSubmittingEmail: boolean;
  emailSubmitted: boolean;
  
  // Mobile menu state
  isMobileMenuOpen: boolean;
  
  // Actions
  setEmailForm: (form: EmailSignupForm) => void;
  submitEmail: (email: string) => Promise<void>;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
}

export const useLandingStore = create<LandingStore>((set, get) => ({
  // Initial state
  emailForm: { email: '' },
  isSubmittingEmail: false,
  emailSubmitted: false,
  isMobileMenuOpen: false,
  
  // Actions
  setEmailForm: (form) => set({ emailForm: form }),
  
  submitEmail: async (email) => {
    set({ isSubmittingEmail: true });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In real implementation, this would call an API
      console.log('Email submitted:', email);
      
      set({ 
        emailSubmitted: true, 
        isSubmittingEmail: false,
        emailForm: { email: '' }
      });
    } catch (error) {
      set({ isSubmittingEmail: false });
      throw error;
    }
  },
  
  toggleMobileMenu: () => set((state) => ({ 
    isMobileMenuOpen: !state.isMobileMenuOpen 
  })),
  
  closeMobileMenu: () => set({ isMobileMenuOpen: false })
}));