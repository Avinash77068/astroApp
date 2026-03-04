/**
 * RootNavigator
 * Root navigation component that handles auth state routing
 * Shows SplashScreen during session restoration
 * Routes to AuthNavigator or AppNavigator based on authentication state
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthStore } from '../../store/authStore';
import { SplashScreen } from '../../component/common/SplashScreen';
import { LoginScreen } from '../auth/screens/LoginScreen';
import { SignupScreen } from '../auth/screens/SignupScreen';
import { OtpScreen } from '../auth/screens/OtpScreen';
import AppStackScreen from './AppStackScreen';

type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  Otp: { phone: string };
};

type AppStackParamList = {
  Main: undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const AppStack = createNativeStackNavigator<AppStackParamList>();

function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Signup" component={SignupScreen} />
      <AuthStack.Screen name="Otp" component={OtpScreen} />
    </AuthStack.Navigator>
  );
}

function AppNavigator() {
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen name="Main" component={AppStackScreen} />
    </AppStack.Navigator>
  );
}


export function RootNavigator() {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const isRestoring = useAuthStore(state => state.isRestoring);

  if (isRestoring) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
