/**
 * Authentication Service Layer
 * Handles all API calls using Fetch API
 * No business logic - pure API communication
 */

import {
  LoginRequest,
  LoginResponse,
  SignupRequest,
  SignupResponse,
  ApiError,
} from '../../../types/authTypes';

const API_BASE_URL = 'http://localhost:3000/api';

/**
 * Generic fetch wrapper with error handling
 */
const fetchAPI = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      const error: ApiError = {
        message: data.message || 'An error occurred',
        status: response.status,
      };
      throw error;
    }

    return data as T;
  } catch (error) {
    if ((error as ApiError).message) {
      throw error;
    }
    
    throw {
      message: 'Network error. Please check your connection.',
      status: 0,
    } as ApiError;
  }
};

/**
 * Login API call
 */
export const loginWithEmail = async (
  credentials: LoginRequest
): Promise<LoginResponse> => {
  return fetchAPI<LoginResponse>('/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
};

/**
 * Signup API call
 */
export const signupAPI = async (
  userData: SignupRequest
): Promise<SignupResponse> => {
  return fetchAPI<SignupResponse>('/signup', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
};
