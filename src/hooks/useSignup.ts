/**
 * useSignup Hook
 * TanStack Query mutation hook for signup functionality
 * Handles API call and success/error states
 */

import { useMutation } from '@tanstack/react-query';
import { signupAPI } from '../app/auth/api/authService';
import { SignupRequest, SignupResponse, ApiError } from '../types/authTypes';

export const useSignup = () => {
  return useMutation<SignupResponse, ApiError, SignupRequest>({
    mutationFn: async (userData: SignupRequest) => {
      return await signupAPI(userData);
    },
    onError: (error) => {
      console.error('Signup failed:', error.message);
    },
  });
};
