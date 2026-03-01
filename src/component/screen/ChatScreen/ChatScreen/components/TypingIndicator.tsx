import React, { useRef, useEffect } from 'react';
import { View, Animated } from 'react-native';

const TypingIndicator = () => {
  const anim1 = useRef(new Animated.Value(0)).current;
  const anim2 = useRef(new Animated.Value(0)).current;
  const anim3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animate = () => {
      Animated.sequence([
        Animated.timing(anim1, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(anim2, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(anim3, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(anim1, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(anim2, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(anim3, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => animate());
    };
    animate();
  }, [anim1, anim2, anim3]);

  return (
    <View style={{ flexDirection: 'row' }}>
      <Animated.Text
        style={{ opacity: anim1, fontSize: 14, color: '#2C2C2C' }}
      >
        •
      </Animated.Text>
      <Animated.Text
        style={{ opacity: anim2, fontSize: 14, color: '#2C2C2C' }}
      >
        •
      </Animated.Text>
      <Animated.Text
        style={{ opacity: anim3, fontSize: 14, color: '#2C2C2C' }}
      >
        •
      </Animated.Text>
    </View>
  );
};

export default TypingIndicator;
