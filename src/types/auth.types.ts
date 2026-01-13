export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'doctor' | 'admin' | 'researcher';
  hospital: string;
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
  confirmPassword: string;
}