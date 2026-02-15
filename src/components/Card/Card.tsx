import React, { memo } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing } from '../../theme';
import { BORDER_RADIUS } from '../../constants';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: keyof typeof spacing;
  variant?: 'default' | 'elevated' | 'outlined';
}

const Card = memo<CardProps>(({ children, style, padding = 'lg', variant = 'default' }) => {
  return (
    <View style={[styles.card, styles[variant], { padding: spacing[padding] }, style]}>
      {children}
    </View>
  );
});

Card.displayName = 'Card';

const styles = StyleSheet.create({
  card: {
    borderRadius: BORDER_RADIUS.xl,
    backgroundColor: colors.background.card,
  },
  default: {
    backgroundColor: colors.background.card,
  },
  elevated: {
    backgroundColor: colors.background.card,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  outlined: {
    backgroundColor: colors.transparent,
    borderWidth: 1,
    borderColor: colors.border.medium,
  },
});

export default Card;
