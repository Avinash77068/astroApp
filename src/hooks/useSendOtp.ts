import { useMutation } from '@tanstack/react-query';
import { sendOtp } from '../app/services/authService';
import { OtpRequest, OtpResponse } from '../types/authTypes';
import { ApiError } from '../types/api';

export const useSendOtp = () => {
  return useMutation<OtpResponse, ApiError, OtpRequest>({
    mutationFn: async (payload: OtpRequest) => {
      return await sendOtp(payload);
    },
    onError: (error) => {
      console.error('Send OTP failed:', error.message);
    },
  });
};
