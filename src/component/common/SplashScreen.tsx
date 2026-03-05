import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import SplashScreenLoader from './SplashScreenLoader';

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

  const handleFinish = () => { };

  return <SplashScreenLoader onFinish={handleFinish} />;
};
