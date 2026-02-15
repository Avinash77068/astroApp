import React, { useEffect, useMemo, memo } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';

const StarBackground = memo(() => {
  const stars = useMemo(
    () =>
      [...Array(50)].map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 3 + 1,
        opacity: new Animated.Value(0.3),
      })),
    [],
  );

  useEffect(() => {
    stars.forEach(star => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(star.opacity, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(star.opacity, {
            toValue: 0.3,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    });
  }, [stars]);

  return (
    <View style={StyleSheet.absoluteFill}>
      {stars.map((star, index) => (
        <Animated.View
          key={index}
          style={[
            styles.star,
            {
              width: star.size,
              height: star.size,
              top: star.top,
              left: star.left,
              opacity: star.opacity,
            },
          ]}
        />
      ))}
    </View>
  );
});

StarBackground.displayName = 'StarBackground';

const styles = StyleSheet.create({
  star: {
    position: 'absolute',
    borderRadius: 50,
    backgroundColor: colors.white,
  },
});

export default StarBackground;
