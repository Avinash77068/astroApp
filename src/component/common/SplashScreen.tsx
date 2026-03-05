import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import Loader from './Loader';

export const SplashScreen: React.FC = () => {
  const restoreSession = useAuthStore((state) => state.restoreSession);
  const [isSessionRestored, setIsSessionRestored] = useState(false);

  useEffect(() => {
    setTimeout(() => {
       const initSession = async () => {
         await restoreSession();
         setIsSessionRestored(true);
       };
       initSession();
    },2000)
   
  }, [restoreSession]);

  const handleFinish = () => {
    // Loader will auto-finish after 3 seconds
    // Session restoration is already complete
  };

  return <Loader onFinish={handleFinish} />;
};
