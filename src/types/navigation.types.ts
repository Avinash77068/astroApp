import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Splash: undefined;
  Auth: undefined;
  OTP: {
    phone: string;
    email: string;
  };
  Profile: {
    phone: string;
    email: string;
  };
  Home: undefined;
};

export type ScreenNames = keyof RootStackParamList;
