import { useMutation } from '@tanstack/react-query';
import { login } from '../app/services/authService';
import { useAuthStore } from '../store/authStore';
import { LoginRequest, LoginResponse } from '../types/authTypes';
import { ApiError } from '../types/api';

export const useLogin = () => {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation<LoginResponse, ApiError, LoginRequest>({
    mutationFn: async (credentials: LoginRequest) => {
      const response = await login(credentials);
      await setAuth(response.token, response.user);
      return response;
    },
    onError: (error) => {
      console.error('Login failed:', error.message);
    },
  });
};
