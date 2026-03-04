/**
 * Authentication Type Definitions
 * Centralized type definitions for the authentication module
 */

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  isVerified?: boolean;
  role?: string;
  lastLogin?: string;
  createdAt?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export interface SignupResponse {
  user: User;
  token: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isRestoring: boolean;
}

export interface AuthActions {
  setAuth: (token: string, user: User) => Promise<void>;
  restoreSession: () => Promise<void>;
  logout: () => Promise<void>;
}

export type AuthStore = AuthState & AuthActions;

export interface OtpRequest {
  phone: string;
}

export interface OtpResponse {
  phone: string;
  otpExpiresIn: number;
  otp?: string;
}

export interface VerifyOtpRequest {
  phone: string;
  otp: string;
}

export interface VerifyOtpResponse {
  user: User;
  token: string;
}

export interface UpdateProfileRequest {
  name?: string;
  email?: string;
  phone?: string;
}

export interface ProfileResponse {
  user: User;
}

export interface ApiError {
  message: string;
  status?: number;
}
