/**
 * AsyncStorage Utility Layer
 * Provides type-safe wrapper functions for AsyncStorage operations
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  AUTH_TOKEN: '@auth_token',
  USER_DATA: '@user_data',
} as const;

/**
 * Save authentication token to AsyncStorage
 */
export const saveToken = async (token: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
  } catch (error) {
    console.error('Error saving token:', error);
    throw new Error('Failed to save authentication token');
  }
};

/**
 * Retrieve authentication token from AsyncStorage
 */
export const getToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  } catch (error) {
    console.error('Error retrieving token:', error);
    return null;
  }
};

/**
 * Save user data to AsyncStorage
 */
export const saveUserData = async (user: object): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(user));
  } catch (error) {
    console.error('Error saving user data:', error);
    throw new Error('Failed to save user data');
  }
};

/**
 * Retrieve user data from AsyncStorage
 */
export const getUserData = async <T>(): Promise<T | null> => {
  try {
    const userData = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error retrieving user data:', error);
    return null;
  }
};

/**
 * Clear all authentication data from AsyncStorage
 */
export const clearAuthData = async (): Promise<void> => {
  try {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.AUTH_TOKEN,
      STORAGE_KEYS.USER_DATA,
    ]);
  } catch (error) {
    console.error('Error clearing auth data:', error);
    throw new Error('Failed to clear authentication data');
  }
};
