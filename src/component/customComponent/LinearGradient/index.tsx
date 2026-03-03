/**
 * GradientWrapper
 * Generic reusable LinearGradient wrapper component
 * Provides consistent gradient backgrounds across the app
 */

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface GradientWrapperProps {
  children: React.ReactNode;
  colors?: string[];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  style?: ViewStyle;
  locations?: number[];
}

export const GradientWrapper: React.FC<GradientWrapperProps> = ({
  children,
  colors = ['#4c8c75', '#d1cc47', '#29d519'],
  start = { x: 0, y: 0 },
  end = { x: 0, y: 1 },
  style,
  locations,
}) => {
  return (
    <LinearGradient
      colors={colors}
      start={start}
      end={end}
      locations={locations}
      style={[styles.gradient, style]}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
});
