import React, { forwardRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: any;
  inputContainerStyle?: any;
  secureToggle?: boolean; // for password toggle
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
    marginBottom: 6,
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0,
    borderColor: 'transparent',
    backgroundColor: 'transparent',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
  },
  icon: {
    marginHorizontal: 6,
  },
  focused: {
    borderColor: '#2563EB',
  },
  errorBorder: {
    borderColor: '#DC2626',
  },
  errorText: {
    marginTop: 4,
    fontSize: 12,
    color: '#DC2626',
  },
  disabled: {
    backgroundColor: '#F3F4F6',
  },
});
