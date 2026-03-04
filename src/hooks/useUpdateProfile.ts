import { useMutation } from '@tanstack/react-query';
import { updateProfile } from '../app/services/authService';
import { useAuthStore } from '../store/authStore';
import { UpdateProfileRequest, ProfileResponse } from '../types/authTypes';
import { ApiError } from '../types/api';

export const useUpdateProfile = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const token = useAuthStore((state) => state.token);

  return useMutation<ProfileResponse, ApiError, UpdateProfileRequest>({
    mutationFn: async (payload: UpdateProfileRequest) => {
      const response = await updateProfile(payload);
      if (token) {
        await setAuth(token, response.user);
      }
      return response;
    },
    onError: (error) => {
      console.error('Update profile failed:', error.message);
    },
  });
};
