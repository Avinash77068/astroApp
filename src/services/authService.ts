import { User, AuthData, ProfileData } from '../types/user.types';
import { OTPResponse, VerifyOTPResponse } from '../types/api.types';
import { delay, generateId } from '../utils/helpers';

export const authService = {
  async sendOTP(authData: AuthData): Promise<OTPResponse> {
    await delay(1000);
    
    return {
      success: true,
      message: 'OTP sent successfully',
    };
  },

  async verifyOTP(phone: string, otp: string): Promise<VerifyOTPResponse> {
    await delay(1000);
    
    if (otp === '1234') {
      return {
        success: true,
        token: 'mock-auth-token-' + generateId(),
        message: 'OTP verified successfully',
      };
    }
    
    return {
      success: false,
      message: 'Invalid OTP',
    };
  },

  async createProfile(
    authData: AuthData,
    profileData: ProfileData
  ): Promise<User> {
    await delay(1000);
    
    const user: User = {
      id: generateId(),
      phone: authData.phone,
      email: authData.email,
      fullName: profileData.fullName,
      place: profileData.place,
      dateOfBirth: profileData.dateOfBirth,
      gender: profileData.gender,
      createdAt: new Date().toISOString(),
    };
    
    return user;
  },
};
