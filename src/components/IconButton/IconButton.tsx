import React, { memo } from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing } from '../../theme';
import { BORDER_RADIUS } from '../../constants';

interface IconButtonProps {
  onPress?: () => void;
  children: React.ReactNode;
  style?: ViewStyle;
  size?: number;
  variant?: 'default' | 'transparent';
  disabled?: boolean;
}

const IconButton = memo<IconButtonProps>(({ 
  onPress, 
  children, 
  style, 
  size = 40,
  variant = 'default',
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        styles[variant],
        { width: size, height: size },
        disabled && styles.disabled,
        style,
      ]}
      activeOpacity={0.7}
    >
      {children}
    </TouchableOpacity>
  );
});

IconButton.displayName = 'IconButton';

const styles = StyleSheet.create({
  button: {
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  default: {
    backgroundColor: colors.border.light,
  },
  transparent: {
    backgroundColor: colors.transparent,
  },
  disabled: {
    opacity: 0.5,
  },
});

export default IconButton;
