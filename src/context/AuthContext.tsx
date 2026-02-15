import React, { createContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { User, AuthData, ProfileData } from '../types/user.types';
import { storageService } from '../services/storageService';
import { authService } from '../services/authService';

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  loading: boolean;
  login: (authData: AuthData, profileData: ProfileData) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (profileData: Partial<ProfileData>) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const savedUser = await storageService.getItem<User>(storageService.keys.USER);
      const isLoggedIn = await storageService.getItem<boolean>(storageService.keys.IS_LOGGED_IN);
      
      if (savedUser && isLoggedIn) {
        setUser(savedUser);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = useCallback(async (authData: AuthData, profileData: ProfileData) => {
    try {
      const newUser = await authService.createProfile(authData, profileData);
      
      await storageService.setItem(storageService.keys.USER, newUser);
      await storageService.setItem(storageService.keys.IS_LOGGED_IN, true);
      
      setUser(newUser);
    } catch (error) {
      throw new Error('Failed to login');
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await storageService.removeItem(storageService.keys.USER);
      await storageService.removeItem(storageService.keys.IS_LOGGED_IN);
      await storageService.removeItem(storageService.keys.AUTH_TOKEN);
      
      setUser(null);
    } catch (error) {
      throw new Error('Failed to logout');
    }
  }, []);

  const updateProfile = useCallback(async (profileData: Partial<ProfileData>) => {
    if (!user) return;

    try {
      const updatedUser = { ...user, ...profileData };
      await storageService.setItem(storageService.keys.USER, updatedUser);
      setUser(updatedUser);
    } catch (error) {
      throw new Error('Failed to update profile');
    }
  }, [user]);

  const value: AuthContextType = {
    user,
    isLoggedIn: !!user,
    loading,
    login,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
