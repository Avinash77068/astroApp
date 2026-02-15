import React, { memo } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../theme';

interface GradientBackgroundProps {
  children: React.ReactNode;
  style?: ViewStyle;
  colors?: string[];
}

const GradientBackground = memo<GradientBackgroundProps>(({ 
  children, 
  style,
  colors: customColors = [colors.background.primary, colors.background.secondary],
}) => {
  return (
    <LinearGradient colors={customColors} style={[styles.container, style]}>
      {children}
    </LinearGradient>
  );
});

GradientBackground.displayName = 'GradientBackground';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default GradientBackground;
