import { User, LoginResponse } from '../types/auth.types';

export const mockUsers: User[] = [
  {
    id: 'usr_001',
    email: 'dr.chen@mercyhospital.com',
    name: 'Dr. Sarah Chen',
    role: 'doctor',
    hospital: 'Mercy Hospital',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNOk2REbCRSJ__g12eTMDPC_6fkM8VA4zpkf4OYyEXbyJ2PW4V7Y7E5jqOrHFySJVLdD95tuS1hfbgWCF4aNh9s__wNFG5Gp3fSHFZYluPPrYxaQW1h6CkxkshKp8w7NjRXtRErAdJTlmLktEotgX9NI_npDI3hUdQ2_xKi7IcX5toRaY8jLffYIRmjXBvgEj0vPkY7Jo8JcoR7lIVmWUHkoe8PiWIrDsL01kHXETCPCKI_G4irAvnvzECcVveouOm4Og28PPTY1s'
  },
  {
    id: 'usr_002',
    email: 'admin@chromapilot.com',
    name: 'Dr. Michael Rodriguez',
    role: 'admin',
    hospital: 'Chroma-Pilot Systems',
  },
  {
    id: 'usr_003',
    email: 'researcher@lagosuni.edu.ng',
    name: 'Dr. Adunni Okafor',
    role: 'researcher',
    hospital: 'Lagos University Teaching Hospital',
  }
];

export const mockLoginResponse = (email: string): LoginResponse => {
  // Always return Dr. Ade for demo
  const user: User = {
    id: 'usr_demo',
    email: email || 'dr.ade@hospital.com',
    name: 'Dr. Ade',
    role: 'doctor',
    hospital: 'Demo Hospital'
  };
  
  return {
    user,
    token: 'demo_token_' + Date.now(),
    refreshToken: 'demo_refresh_' + Date.now()
  };
};

// Simulate API delay
export const simulateApiDelay = (ms: number = 800): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};