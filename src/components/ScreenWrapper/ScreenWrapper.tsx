import React, { memo, ReactNode } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';

interface ScreenWrapperProps {
  children: ReactNode;
  scrollable?: boolean;
  keyboardAware?: boolean;
}

export const ScreenWrapper = memo<ScreenWrapperProps>(({
  children,
  scrollable = false,
  keyboardAware = true,
}) => {
  const content = scrollable ? (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {children}
    </ScrollView>
  ) : (
    <View style={styles.container}>{children}</View>
  );

  if (keyboardAware) {
    return (
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {content}
      </KeyboardAvoidingView>
    );
  }

  return content;
});

ScreenWrapper.displayName = 'ScreenWrapper';

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
    padding: spacing.lg,
  },
  
  scrollView: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  
  scrollContent: {
    flexGrow: 1,
    padding: spacing.lg,
  },
});
