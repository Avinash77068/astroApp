import { useColorScheme } from 'react-native';
import { useHomepageStore } from '../store/useHomeStore';

/* ===============================
   🎨 COLORS
=================================*/

export const LightColors = {
  primary: '#7C3AED', // Astro Purple
  secondary: '#F59E0B', // Golden
  background: '#FFFFFF',
  gradient: '#7C3AED',
  graybackground: '#F5F5F5',
  surface: '#F8F9FC',
  textPrimary: '#111827',
  textSecondary: '#6B7280',
  border: '#E5E7EB',
  success: '#10B981',
  error: '#EF4444',
  icon: '#4B5563',
  buttonText: '#FFFFFF',
};
export const BorderColor = {
  primary: 'transparent',
  secondary: '#E5E7EB',
};

export const DarkColors = {
  primary: '#A78BFA',
  secondary: '#FBBF24',
  background: '#0F172A',
  surface: '#1E293B',
  textPrimary: '#F9FAFB',
  textSecondary: '#9CA3AF',
  border: '#334155',
  success: '#34D399',
  error: '#F87171',
  icon: '#CBD5E1',
  buttonText: '#0F172A',
  overlay: 'rgba(0,0,0,0.4)',
};

/* ===============================
   📝 TYPOGRAPHY
=================================*/

export const Typography = {
  h1: { fontSize: 28, fontWeight: '700' as const },
  h2: { fontSize: 22, fontWeight: '600' as const },
  body: { fontSize: 16, fontWeight: '400' as const },
  caption: { fontSize: 14, fontWeight: '400' as const },
};

/* ===============================
   📏 SPACING
=================================*/

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

/* ===============================
   🎯 THEME HOOK
=================================*/

export const useAppTheme = () => {
  const scheme = useColorScheme();
  const colors = scheme === 'dark' ? DarkColors : LightColors;

  return {
    colors,
    typography: Typography,
    spacing: Spacing,
  };
};

/* ===============================
   🎨 USE COLORS HOOK (API BOUND)
=================================*/

export const useColors = () => {
  const { data } = useHomepageStore();
  const apiColors = data?.appConfig?.constants?.COLORS;

  return {
    LightColors: apiColors || LightColors,
    DarkColors,
    BorderColor,
  };
};
