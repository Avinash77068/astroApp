import React from 'react';
import AppStackScreen from './AppStackScreen';
import LoginScreen from '../../component/screen/LoginScreen/LoginScreen';

const isLogin = true;

export default function RootNavigator() {
  return isLogin ? <AppStackScreen /> : <LoginScreen />;
}
