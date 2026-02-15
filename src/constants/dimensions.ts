import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;

export const SIDEBAR_WIDTH = 260;

export const ICON_SIZES = {
  xs: 16,
  sm: 18,
  md: 20,
  lg: 22,
  xl: 24,
  xxl: 32,
} as const;

export const BORDER_RADIUS = {
  sm: 8,
  md: 10,
  lg: 12,
  xl: 16,
  xxl: 20,
  full: 50,
} as const;
