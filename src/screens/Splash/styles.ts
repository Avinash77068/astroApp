import { StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  content: {
    alignItems: 'center',
    gap: spacing.md,
  },
  
  logo: {
    fontSize: 80,
    marginBottom: spacing.lg,
  },
  
  appName: {
    fontSize: typography.fontSize.hero,
    fontWeight: typography.fontWeight.bold,
    color: colors.white,
  },
  
  tagline: {
    fontSize: typography.fontSize.lg,
    color: colors.white,
    opacity: 0.9,
  },
});
