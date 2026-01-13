import { useMutation, useQuery } from '@tanstack/react-query';
import { LoginCredentials, ForgotPasswordRequest, LoginResponse } from '../types/auth.types';
import { mockLoginResponse, simulateApiDelay } from '../mocks/authData';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

// Mock API functions
const loginApi = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  await simulateApiDelay();
  
  // Simulate validation - accept any non-empty credentials
  if (!credentials.email || !credentials.password) {
    throw new Error('Email and password are required');
  }
  
  // Accept any credentials for demo purposes
  return mockLoginResponse(credentials.email);
};

const forgotPasswordApi = async (request: ForgotPasswordRequest): Promise<{ message: string }> => {
  await simulateApiDelay(500);
  
  if (!request.email) {
    throw new Error('Email is required');
  }
  
  return { message: 'Password reset instructions sent to your email' };
};

// Hooks
export const useLogin = () => {
  const { login, setError, setLoading } = useAuthStore();
  const navigate = useNavigate();
  
  return useMutation({
    mutationFn: loginApi,
    onMutate: () => {
      setLoading(true);
      setError(null);
    },
    onSuccess: (response) => {
      login(response.user, response.token);
      toast.success(`Welcome back, ${response.user.name}!`);
      navigate('/dashboard');
    },
    onError: (error: Error) => {
      setError(error.message);
      toast.error(error.message);
    },
    onSettled: () => {
      setLoading(false);
    },
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: forgotPasswordApi,
    onSuccess: (response) => {
      toast.success(response.message);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};

export const useLogout = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  
  return () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };
};