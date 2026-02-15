import { StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';
import { spacing, borderRadius } from '../../constants/spacing';
import { typography } from '../../constants/typography';

export const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.md,
  },
  
  primary: {
    backgroundColor: colors.primary,
    color: colors.white,
  },
  
  secondary: {
    backgroundColor: colors.secondary,
    color: colors.white,
  },
  
  outline: {
    backgroundColor: colors.transparent,
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  
  small: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  
  medium: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  
  large: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
  },
  
  fullWidth: {
    width: '100%',
  },
  
  disabled: {
    opacity: 0.5,
  },
  
  text: {
    fontWeight: typography.fontWeight.semibold,
  },
  
  primaryText: {
    color: colors.white,
  },
  
  secondaryText: {
    color: colors.white,
  },
  
  outlineText: {
    color: colors.primary,
  },
  
  smallText: {
    fontSize: typography.fontSize.sm,
  },
  
  mediumText: {
    fontSize: typography.fontSize.base,
  },
  
  largeText: {
    fontSize: typography.fontSize.lg,
  },
  
  white: {
    color: colors.white,
  },
});
