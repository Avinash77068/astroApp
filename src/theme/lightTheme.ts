import { colors } from '../constants/colors';
import { spacing, borderRadius, iconSizes } from '../constants/spacing';
import { typography } from '../constants/typography';

export const lightTheme = {
  colors,
  spacing,
  borderRadius,
  iconSizes,
  typography,
  isDark: false,
};

export type Theme = typeof lightTheme;
