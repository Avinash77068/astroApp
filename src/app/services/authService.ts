import { request } from '../../types/api';
import {
  LoginRequest,
  LoginResponse,
  SignupRequest,
  SignupResponse,
  OtpRequest,
  OtpResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
  UpdateProfileRequest,
  ProfileResponse,
} from '../../types/authTypes';

export const login = async (payload: LoginRequest): Promise<LoginResponse> => {
  return request<LoginResponse>('/user/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
};

export const signup = async (payload: SignupRequest): Promise<SignupResponse> => {
  return request<SignupResponse>('/user/signup', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
};

export const sendOtp = async (payload: OtpRequest): Promise<OtpResponse> => {
  return request<OtpResponse>('/user/send-otp', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
};

export const verifyOtp = async (payload: VerifyOtpRequest): Promise<VerifyOtpResponse> => {
  return request<VerifyOtpResponse>('/user/verify-otp', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
};

export const getProfile = async (): Promise<ProfileResponse> => {
  return request<ProfileResponse>('/user/profile', {
    method: 'GET',
  });
};

export const updateProfile = async (payload: UpdateProfileRequest): Promise<ProfileResponse> => {
  return request<ProfileResponse>('/user/profile', {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
};
