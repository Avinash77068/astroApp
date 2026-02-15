import { StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  
  backButton: {
    marginRight: spacing.md,
    padding: spacing.xs,
  },
  
  backIcon: {
    fontSize: typography.fontSize.xxl,
    color: colors.text.primary,
  },
  
  content: {
    flex: 1,
  },
  
  title: {
    fontSize: typography.fontSize.xxxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  
  subtitle: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
  },
});
