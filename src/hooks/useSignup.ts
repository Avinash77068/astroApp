import { useMutation } from '@tanstack/react-query';
import { signup } from '../app/services/authService';
import { useAuthStore } from '../store/authStore';
import { SignupRequest, SignupResponse } from '../types/authTypes';
import { ApiError } from '../types/api';

export const useSignup = () => {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation<SignupResponse, ApiError, SignupRequest>({
    mutationFn: async (userData: SignupRequest) => {
      const response = await signup(userData);
      await setAuth(response.token, response.user);
      return response;
    },
    onError: (error) => {
      console.error('Signup failed:', error.message);
    },
  });
};
