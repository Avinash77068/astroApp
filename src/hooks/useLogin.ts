/**
 * useLogin Hook
 * TanStack Query mutation hook for login functionality
 * Handles API call, success/error states, and Zustand store updates
 */

import { useMutation } from '@tanstack/react-query';
import { loginAPI } from '../app/auth/api/authService';
import { useAuthStore } from '../store/authStore';
import { LoginRequest, ApiError } from '../types/authTypes';

export const useLogin = () => {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation<void, ApiError, LoginRequest>({
    mutationFn: async (credentials: LoginRequest) => {
      const response = await loginAPI(credentials);
      await setAuth(response.token, response.user);
    },
    onError: (error) => {
      console.error('Login failed:', error.message);
    },
  });
};
