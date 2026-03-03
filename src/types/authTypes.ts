/**
 * Authentication Type Definitions
 * Centralized type definitions for the authentication module
 */

export interface User {
  id: string;
  name: string;
  email: string;
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
}

export interface SignupResponse {
  message: string;
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

export interface ApiError {
  message: string;
  status?: number;
}
