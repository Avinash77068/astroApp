import { useState, useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { SIDEBAR_WIDTH, ANIMATION_DURATION } from '../constants';

export const useSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(-SIDEBAR_WIDTH)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: isOpen ? 0 : -SIDEBAR_WIDTH,
        duration: ANIMATION_DURATION.normal,
        useNativeDriver: true,
      }),
      Animated.timing(overlayOpacity, {
        toValue: isOpen ? 1 : 0,
        duration: ANIMATION_DURATION.normal,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isOpen]);

  const toggle = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);
  const open = () => setIsOpen(true);

  return {
    isOpen,
    slideAnim,
    overlayOpacity,
    toggle,
    close,
    open,
  };
};
