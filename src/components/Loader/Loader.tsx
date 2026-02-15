import React, { memo } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { colors } from '../../constants/colors';
import { StyleSheet } from 'react-native';

interface LoaderProps {
  size?: 'small' | 'large';
  color?: string;
}

export const Loader = memo<LoaderProps>(({
  size = 'large',
  color = colors.primary,
}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
});

Loader.displayName = 'Loader';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
