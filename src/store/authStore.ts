/**
 * Zustand Authentication Store
 * Global state management for authentication
 * Responsibilities: user, token, isAuthenticated, session restoration, logout
 */

import { create } from 'zustand';
import { AuthStore, User } from '../types/authTypes';
import {
  saveToken,
  saveUserData,
  getToken,
  getUserData,
  clearAuthData,
} from '../utils/storage';

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isRestoring: true,

  /**
   * Set authentication state after successful login
   * Persists token and user data to AsyncStorage
   */
  setAuth: async (token: string, user: User) => {
    try {
      await saveToken(token);
      await saveUserData(user);
      set({
        token,
        user,
        isAuthenticated: true,
      });
    } catch (error) {
      console.error('Error setting auth state:', error);
      throw error;
    }
  },

  /**
   * Restore session from AsyncStorage on app launch
   * Called from SplashScreen
   */
  restoreSession: async () => {
    try {
      set({ isRestoring: true });
      
      const token = await getToken();
      const user = await getUserData<User>();

      if (token && user) {
        set({
          token,
          user,
          isAuthenticated: true,
          isRestoring: false,
        });
      } else {
        set({
          token: null,
          user: null,
          isAuthenticated: false,
          isRestoring: false,
        });
      }
    } catch (error) {
      console.error('Error restoring session:', error);
      set({
        token: null,
        user: null,
        isAuthenticated: false,
        isRestoring: false,
      });
    }
  },

  /**
   * Logout user and clear all authentication data
   * Clears AsyncStorage and resets Zustand state
   */
  logout: async () => {
    try {
      await clearAuthData();
      set({
        token: null,
        user: null,
        isAuthenticated: false,
      });
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    }
  },
}));
