import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import { Sparkles } from 'lucide-react-native';
import Svg, { Circle, Path } from 'react-native-svg';

interface SplashScreenProps {
  onComplete: () => void;
}

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const floatAnim = useRef(new Animated.Value(0)).current;
  const sparkleAnim = useRef(new Animated.Value(0)).current;
  const loaderAnim = useRef(new Animated.Value(-width)).current;

  useEffect(() => {
    // Float animation
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

    // Sparkle animation
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

    // Loader animation
    Animated.loop(
      Animated.timing(loaderAnim, {
        toValue: width,
        duration: 1500,
        useNativeDriver: true,
        easing: Easing.inOut(Easing.sin),
      })
    ).start();

    // Complete after 2.5s
    const timer = setTimeout(onComplete, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.starsContainer}>
        {Array.from({ length: 40 }).map((_, i) => (
          <View
            key={i}
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              backgroundColor: 'white',
              position: 'absolute',
              top: Math.random() * height,
              left: Math.random() * width,
              opacity: Math.random(),
              borderRadius: 1,
            }}
          />
        ))}
      </View>

      <View style={styles.content}>
        <Animated.View style={{ transform: [{ translateY: floatAnim }] }}>
          <Svg width={180} height={180} viewBox="0 0 200 200" fill="none">
            <Circle cx="100" cy="100" r="45" stroke="rgba(255,255,255,0.2)" strokeWidth={1} />
            <Path d="M100 60 L100 140 M70 100 L130 100" stroke="rgba(255,255,255,0.3)" strokeWidth={1} />
            <Circle cx="100" cy="70" r="8" fill="rgba(255,255,255,0.3)" />
            <Circle cx="100" cy="130" r="8" fill="rgba(255,255,255,0.3)" />
            <Circle cx="70" cy="100" r="8" fill="rgba(255,255,255,0.3)" />
            <Circle cx="130" cy="100" r="8" fill="rgba(255,255,255,0.3)" />
            <Path
              d="M100 50 L120 70 L140 60 L130 85 L150 90 L130 100 L140 120 L115 115 L110 140 L100 120 L90 140 L85 115 L60 120 L70 100 L50 90 L70 85 L60 60 L80 70 Z"
              fill="none"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth={1.5}
            />
          </Svg>
        </Animated.View>

        <View style={styles.titleContainer}>
          <Animated.View style={{ opacity: sparkleAnim }}>
            <Sparkles size={32} color="white" />
          </Animated.View>
          <Text style={styles.title}>Astro Scope</Text>
        </View>

        <View style={styles.loader}>
          <Animated.View
            style={[
              styles.loaderBar,
              {
                transform: [{ translateX: loaderAnim }],
              },
            ]}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#4a148c', justifyContent: 'center', alignItems: 'center' },
  starsContainer: { ...StyleSheet.absoluteFillObject },
  content: { alignItems: 'center', gap: 40 },
  titleContainer: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  title: { color: 'white', fontSize: 42, fontWeight: '300', letterSpacing: 2 },
  loader: {
    width: 200,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 2,
    overflow: 'hidden',
    marginTop: 20,
  },
  loaderBar: {
    height: 4,
    width: 200,
    backgroundColor: 'white',
  },
});
