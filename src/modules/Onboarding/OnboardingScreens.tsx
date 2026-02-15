import React, { useState, memo, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import Svg, { Circle, Path, Polygon, Line } from 'react-native-svg';
import { colors, spacing, typography } from '../../theme';
import { SCREEN_WIDTH, SCREEN_HEIGHT, BORDER_RADIUS } from '../../constants';
import { GradientBackground, Pagination } from '../../components';

interface Slide {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const slides: Slide[] = [
  {
    title: 'Check Matches With Other Zodiac Signs and Friends',
    description:
      'Our comprehensive matching system will narrow your options to look for an ideally compatible relationship and provide you with insight into friends.',
    icon: (
      <Svg width={200} height={200} viewBox="0 0 200 200">
        <Circle cx="100" cy="100" r="80" stroke={colors.border.dark} strokeWidth="1" fill="none" />
        <Circle cx="100" cy="100" r="60" stroke={colors.border.dark} strokeWidth="1" fill="none" />
        <Circle cx="100" cy="100" r="40" stroke={colors.border.dark} strokeWidth="1" fill="none" />
        {[...Array(12)].map((_, i) => {
          const angle = ((i * 30 - 90) * Math.PI) / 180;
          const x = 100 + 70 * Math.cos(angle);
          const y = 100 + 70 * Math.sin(angle);
          return <Circle key={i} cx={x} cy={y} r="3" fill={colors.text.tertiary} />;
        })}
        <Path d="M100 100 L100 40 M100 100 L160 100" stroke={colors.border.medium} strokeWidth="2" />
      </Svg>
    ),
  },
  {
    title: 'Your Compatibility With The Famous Celebrity',
    description:
      'Our comprehensive matching system will narrow your options to look for an ideally compatible relationship and provide you with insight into friends.',
    icon: (
      <Svg width={200} height={200} viewBox="0 0 200 200">
        <Circle cx="100" cy="100" r="50" stroke={colors.border.dark} strokeWidth="1" fill="none" />
        <Circle cx="70" cy="70" r="15" fill={colors.border.medium} />
        <Circle cx="130" cy="70" r="15" fill={colors.border.medium} />
        <Circle cx="70" cy="130" r="15" fill={colors.border.medium} />
        <Circle cx="130" cy="130" r="15" fill={colors.border.medium} />
        <Polygon
          points="100,50 120,90 165,90 130,115 145,155 100,130 55,155 70,115 35,90 80,90"
          fill="none"
          stroke={colors.border.medium}
          strokeWidth="2"
        />
      </Svg>
    ),
  },
  {
    title: 'Start Each Day With Tarot Reading to Avoid Troubles',
    description:
      'Our comprehensive matching system will narrow your options to look for an ideally compatible relationship and provide you with insight into friends.',
    icon: (
      <Svg width={200} height={200} viewBox="0 0 200 200">
        <Circle cx="100" cy="100" r="70" stroke={colors.border.dark} strokeWidth="1" fill="none" />
        <Path
          d="M100 40 Q130 70 100 100 Q70 130 100 160"
          stroke={colors.border.medium}
          strokeWidth="2"
          fill="none"
        />
        {[...Array(8)].map((_, i) => {
          const angle = (i * 45 * Math.PI) / 180;
          const x1 = 100 + 50 * Math.cos(angle);
          const y1 = 100 + 50 * Math.sin(angle);
          const x2 = 100 + 70 * Math.cos(angle);
          const y2 = 100 + 70 * Math.sin(angle);
          return (
            <Line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={colors.border.dark}
              strokeWidth="1"
            />
          );
        })}
      </Svg>
    ),
  },
];

interface OnboardingScreensProps {
  onComplete: () => void;
}

const OnboardingScreens = memo<OnboardingScreensProps>(({ onComplete }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = useCallback(() => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  }, [currentSlide, onComplete]);

  const handleSkip = useCallback(() => {
    onComplete();
  }, [onComplete]);

  return (
    <GradientBackground style={styles.container}>
      <View style={styles.main}>
        <View style={styles.iconContainer}>{slides[currentSlide].icon}</View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>{slides[currentSlide].title}</Text>
          <Text style={styles.description}>{slides[currentSlide].description}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Pagination total={slides.length} current={currentSlide} />

        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={handleSkip} style={[styles.button, styles.skipButton]}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleNext} style={[styles.button, styles.nextButton]}>
            <Text style={styles.nextText}>
              {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
            </Text>
            <ChevronRight color={colors.white} size={20} />
          </TouchableOpacity>
        </View>
      </View>
    </GradientBackground>
  );
});

OnboardingScreens.displayName = 'OnboardingScreens';

const styles = StyleSheet.create({
  container: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xxxl - 2,
    gap: spacing.huge,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 280,
    height: 280,
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: colors.white,
    fontSize: typography.fontSize.xxxl,
    fontWeight: typography.fontWeight.semibold,
    textAlign: 'center',
    marginBottom: spacing.md + 3,
  },
  description: {
    color: colors.text.secondary,
    fontSize: typography.fontSize.md,
    lineHeight: typography.fontSize.xxxl,
    textAlign: 'center',
    paddingHorizontal: spacing.md - 2,
  },
  footer: {
    width: '100%',
    padding: spacing.xxxl - 2,
    gap: spacing.xl + 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  button: {
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: spacing.md + 2,
    paddingHorizontal: spacing.xxl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipButton: {
    backgroundColor: colors.border.medium,
  },
  nextButton: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  skipText: {
    color: colors.white,
    fontWeight: typography.fontWeight.medium,
  },
  nextText: {
    color: colors.white,
    fontWeight: typography.fontWeight.semibold,
    fontSize: typography.fontSize.lg,
    marginRight: spacing.xs + 2,
  },
});

export default OnboardingScreens;
