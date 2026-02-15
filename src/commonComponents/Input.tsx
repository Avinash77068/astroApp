import React, { forwardRef, useState, memo } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { colors, spacing, typography } from '../theme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: ViewStyle;
  inputContainerStyle?: ViewStyle;
  secureToggle?: boolean;
}

export const Input = forwardRef<TextInput, InputProps>(
  (
    {
      label,
      error,
      leftIcon,
      rightIcon,
      containerStyle,
      inputContainerStyle,
      secureTextEntry,
      secureToggle = false,
      editable = true,
      style,
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [secure, setSecure] = useState(secureTextEntry);

    return (
      <View style={[styles.wrapper, containerStyle]}>
        {label && <Text style={styles.label}>{label}</Text>}

        <View
          style={[
            styles.inputContainer,
            isFocused && styles.focused,
            error && styles.errorBorder,
            !editable && styles.disabled,
            inputContainerStyle,
          ]}
        >
          {leftIcon && <View style={styles.icon}>{leftIcon}</View>}

          <TextInput
            ref={ref}
            style={[styles.input, style]}
            secureTextEntry={secure}
            editable={editable}
            placeholderTextColor="#9CA3AF"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />

          {secureToggle ? (
            <TouchableOpacity
              onPress={() => setSecure(!secure)}
              style={styles.icon}
            >
              <Text style={{ fontSize: 12 }}>{secure ? 'Show' : 'Hide'}</Text>
            </TouchableOpacity>
          ) : (
            rightIcon && <View style={styles.icon}>{rightIcon}</View>
          )}
        </View>

        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    );
  },
);

Input.displayName = 'Input';

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  label: {
    marginBottom: spacing.xs + 2,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.text.secondary,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0,
    borderColor: colors.transparent,
    backgroundColor: colors.transparent,
  },
  input: {
    flex: 1,
    fontSize: typography.fontSize.lg,
    color: colors.text.primary,
  },
  icon: {
    marginHorizontal: spacing.xs + 2,
  },
  focused: {
    borderColor: colors.status.info,
  },
  errorBorder: {
    borderColor: colors.status.error,
  },
  errorText: {
    marginTop: spacing.xs,
    fontSize: typography.fontSize.xs,
    color: colors.status.error,
  },
  disabled: {
    backgroundColor: colors.border.light,
  },
});
