/**
 * SplashScreen
 * Entry point screen that handles session restoration
 * Checks for existing auth token and navigates accordingly
 */

import React, { useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';
import { Loader } from './Loader';

export const SplashScreen: React.FC = () => {
  const restoreSession = useAuthStore((state) => state.restoreSession);

  useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  return <Loader />;
};
