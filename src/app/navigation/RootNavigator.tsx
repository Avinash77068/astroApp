import React from 'react';
import BottomStackScreen from './BottomStackScreen';
import LoginScreen from '../../component/screen/LoginScreen';

const isLogin = true;

export default function RootNavigator() {
  return isLogin ? <BottomStackScreen /> : <LoginScreen />;
}
