import { StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';
import { spacing, borderRadius } from '../../constants/spacing';
import { typography } from '../../constants/typography';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  form: {
    marginTop: spacing.xl,
    gap: spacing.md,
  },
  
  genderContainer: {
    marginBottom: spacing.md,
  },
  
  genderLabel: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  
  genderButtons: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  
  genderButton: {
    flex: 1,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1.5,
    borderColor: colors.border.medium,
    backgroundColor: colors.background.secondary,
    alignItems: 'center',
  },
  
  genderButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  
  genderText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.text.primary,
  },
  
  genderTextActive: {
    color: colors.white,
  },
  
  error: {
    fontSize: typography.fontSize.xs,
    color: colors.error,
    marginTop: spacing.xs,
  },
});
