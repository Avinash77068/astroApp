import React, { memo, useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, ViewStyle, Easing } from 'react-native';
import { colors } from '../../theme';
import { SCREEN_WIDTH } from '../../constants';

interface LoaderProps {
  style?: ViewStyle;
  width?: number;
  height?: number;
  duration?: number;
}

const Loader = memo<LoaderProps>(({ 
  style, 
  width = 200, 
  height = 4,
  duration = 1500,
}) => {
  const loaderAnim = useRef(new Animated.Value(-width)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(loaderAnim, {
        toValue: width,
        duration,
        useNativeDriver: true,
        easing: Easing.inOut(Easing.sin),
      })
    ).start();
  }, [duration, width]);

  return (
    <View style={[styles.loader, { width, height }, style]}>
      <Animated.View
        style={[
          styles.loaderBar,
          {
            height,
            width,
            transform: [{ translateX: loaderAnim }],
          },
        ]}
      />
    </View>
  );
});

Loader.displayName = 'Loader';

const styles = StyleSheet.create({
  loader: {
    backgroundColor: colors.border.light,
    borderRadius: 2,
    overflow: 'hidden',
  },
  loaderBar: {
    backgroundColor: colors.white,
  },
});

export default Loader;
