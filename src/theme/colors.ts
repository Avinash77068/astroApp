export const colors = {
  primary: '#7c4dff',
  primaryDark: '#6a1b9a',
  primaryLight: '#4a148c',
  
  secondary: '#FFD369',
  
  background: {
    primary: '#4a148c',
    secondary: '#6a1b9a',
    card: 'rgba(255,255,255,0.08)',
    overlay: 'rgba(0,0,0,0.4)',
  },
  
  text: {
    primary: '#FFFFFF',
    secondary: 'rgba(255,255,255,0.7)',
    tertiary: 'rgba(255,255,255,0.5)',
    disabled: 'rgba(255,255,255,0.3)',
  },
  
  border: {
    light: 'rgba(255,255,255,0.1)',
    medium: 'rgba(255,255,255,0.2)',
    dark: 'rgba(255,255,255,0.3)',
  },
  
  status: {
    success: '#4caf50',
    error: '#DC2626',
    warning: '#ff7675',
    info: '#2563EB',
  },
  
  button: {
    primary: '#7c4dff',
    secondary: '#4B5563',
    danger: '#DC2626',
  },
  
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
} as const;

export type Colors = typeof colors;
