import React, { useEffect, memo } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Animated } from 'react-native';
import { Sparkles } from 'lucide-react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { colors, spacing, typography } from '../../theme';
import { SCREEN_WIDTH, SCREEN_HEIGHT, STAR_COUNT, ICON_SIZES } from '../../constants';
import { useFloatAnimation, useSparkleAnimation } from '../../hooks';
import { Loader } from '../../components';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = memo<SplashScreenProps>(({ onComplete }) => {
  const floatAnim = useFloatAnimation();
  const sparkleAnim = useSparkleAnimation();

  useEffect(() => {
    const timer = setTimeout(onComplete, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.starsContainer}>
        {Array.from({ length: STAR_COUNT.medium }).map((_, i) => (
          <View
            key={i}
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              backgroundColor: colors.white,
              position: 'absolute',
              top: Math.random() * SCREEN_HEIGHT,
              left: Math.random() * SCREEN_WIDTH,
              opacity: Math.random(),
              borderRadius: 1,
            }}
          />
        ))}
      </View>

      <View style={styles.content}>
        <Animated.View style={{ transform: [{ translateY: floatAnim }] }}>
          <Svg width={180} height={180} viewBox="0 0 200 200" fill="none">
            <Circle cx="100" cy="100" r="45" stroke={colors.border.medium} strokeWidth={1} />
            <Path d="M100 60 L100 140 M70 100 L130 100" stroke={colors.border.dark} strokeWidth={1} />
            <Circle cx="100" cy="70" r="8" fill={colors.border.dark} />
            <Circle cx="100" cy="130" r="8" fill={colors.border.dark} />
            <Circle cx="70" cy="100" r="8" fill={colors.border.dark} />
            <Circle cx="130" cy="100" r="8" fill={colors.border.dark} />
            <Path
              d="M100 50 L120 70 L140 60 L130 85 L150 90 L130 100 L140 120 L115 115 L110 140 L100 120 L90 140 L85 115 L60 120 L70 100 L50 90 L70 85 L60 60 L80 70 Z"
              fill="none"
              stroke={colors.border.medium}
              strokeWidth={1.5}
            />
          </Svg>
        </Animated.View>

        <View style={styles.titleContainer}>
          <Animated.View style={{ opacity: sparkleAnim }}>
            <Sparkles size={ICON_SIZES.xxl} color={colors.white} />
          </Animated.View>
          <Text style={styles.title}>Astro Scope</Text>
        </View>

        <Loader width={200} height={4} />
      </View>
    </SafeAreaView>
  );
});

SplashScreen.displayName = 'SplashScreen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  starsContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    alignItems: 'center',
    gap: spacing.huge,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  title: {
    color: colors.white,
    fontSize: typography.fontSize.hero,
    fontWeight: typography.fontWeight.light,
    letterSpacing: 2,
  },
});

export default SplashScreen;
