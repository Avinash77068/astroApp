import { StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  content: {
    marginTop: spacing.xl,
    gap: spacing.lg,
  },
  
  error: {
    color: colors.error,
    fontSize: typography.fontSize.sm,
    textAlign: 'center',
  },
  
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.xs,
    marginTop: spacing.md,
  },
  
  resendText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  
  resendButton: {
    fontSize: typography.fontSize.sm,
    color: colors.primary,
    fontWeight: typography.fontWeight.semibold,
  },
  
  timer: {
    fontSize: typography.fontSize.sm,
    color: colors.text.tertiary,
  },
});
