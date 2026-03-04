import { useMutation } from '@tanstack/react-query';
import { verifyOtp } from '../app/services/authService';
import { useAuthStore } from '../store/authStore';
import { VerifyOtpRequest, VerifyOtpResponse } from '../types/authTypes';
import { ApiError } from '../types/api';

export const useVerifyOtp = () => {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation<VerifyOtpResponse, ApiError, VerifyOtpRequest>({
    mutationFn: async (payload: VerifyOtpRequest) => {
      const response = await verifyOtp(payload);
      await setAuth(response.token, response.user);
      return response;
    },
    onError: (error) => {
      console.error('Verify OTP failed:', error.message);
    },
  });
};
