export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface OTPResponse {
  success: boolean;
  message: string;
}

export interface VerifyOTPResponse {
  success: boolean;
  token?: string;
  message: string;
}

export interface CategoryItem {
  id: string;
  name: string;
  icon: string;
}

export interface HomeItem {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  rating: number;
}
