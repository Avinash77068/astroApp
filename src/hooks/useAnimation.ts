import { useRef, useEffect } from 'react';
import { Animated, Easing } from 'react-native';
import { ANIMATION_DURATION } from '../constants';

export const useFadeIn = (duration: number = ANIMATION_DURATION.normal) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration,
      useNativeDriver: true,
    }).start();
  }, [duration]);

  return fadeAnim;
};

export const useScale = (duration: number = ANIMATION_DURATION.normal) => {
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();
  }, []);

  return scaleAnim;
};

export const useFloatAnimation = () => {
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -20,
          duration: 1500,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.sin),
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.sin),
        }),
      ])
    ).start();
  }, []);

  return floatAnim;
};

export const useSparkleAnimation = () => {
  const sparkleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(sparkleAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.sin),
        }),
        Animated.timing(sparkleAnim, {
          toValue: 0.6,
          duration: 1000,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.sin),
        }),
      ])
    ).start();
  }, []);

  return sparkleAnim;
};

export const useSlideAnimation = (
  initialValue: number,
  toValue: number,
  duration: number = ANIMATION_DURATION.normal
) => {
  const slideAnim = useRef(new Animated.Value(initialValue)).current;

  const slide = (isOpen: boolean) => {
    Animated.timing(slideAnim, {
      toValue: isOpen ? toValue : initialValue,
      duration,
      useNativeDriver: true,
    }).start();
  };

  return { slideAnim, slide };
};
