import { ENV } from '../config/env';
import { useAuthStore } from '../store/authStore';

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

export class ApiError extends Error {
  status?: number;
  
  constructor(message: string, status?: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = useAuthStore.getState().token;
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (options.headers) {
    Object.assign(headers, options.headers);
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${ENV.API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    let data: ApiResponse<T>;
    
    try {
      data = await response.json();
    } catch {
      throw new ApiError('Invalid response format', response.status);
    }

    if (response.status === 401) {
      await useAuthStore.getState().logout();
      throw new ApiError('Session expired. Please login again.', 401);
    }

    if (!response.ok || !data.success) {
      throw new ApiError(
        data.message || 'An error occurred',
        response.status
      );
    }

    return data.data as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    if (error instanceof TypeError) {
      throw new ApiError('Network error. Please check your connection.');
    }
    
    throw new ApiError('An unexpected error occurred');
  }
}
