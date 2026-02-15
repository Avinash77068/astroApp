export interface User {
  id: string;
  phone: string;
  email: string;
  fullName: string;
  place: string;
  dateOfBirth: string;
  gender: Gender;
  createdAt: string;
}

export type Gender = 'male' | 'female' | 'other';

export interface AuthData {
  phone: string;
  email: string;
}

export interface ProfileData {
  fullName: string;
  place: string;
  dateOfBirth: string;
  gender: Gender;
}
