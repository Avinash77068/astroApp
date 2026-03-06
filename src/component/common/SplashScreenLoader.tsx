import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Image } from 'react-native';
import { useHomepage } from '../../hooks/useHomepage';
import { LightColors } from '../../constant/colors';
import logo from '../../../assets/logo.png';
interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreenLoader: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Start animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 10,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start();

    // Navigate after 3 seconds
    const timer = setTimeout(() => {
      onFinish();
    }, 5000);

    return () => clearTimeout(timer);
  }, [fadeAnim, scaleAnim, onFinish]);
  const { data: homeData } = useHomepage();
  const appConfig: any = homeData?.appConfig;
  console.log(appConfig, 'appConfig');
  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View style={styles.iconContainer}>
          <Image source={logo} style={styles.logo} />
        </View>
        <Text style={styles.title}>{appConfig?.appName}</Text>
        <Text style={styles.subtitle}>{appConfig?.appDescription}</Text>
        <View style={styles.loadingBar}>
          <Animated.View
            style={[
              styles.loadingProgress,
              {
                transform: [
                  {
                    scaleX: fadeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 1],
                    }),
                  },
                ],
              },
            ]}
          />
        </View>
      </Animated.View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Powered by Advanced AI</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LightColors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: LightColors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: LightColors.primary,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: LightColors.textPrimary,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 12,
    color: LightColors.textSecondary,
    marginBottom: 40,
    textAlign: 'center',
  },
  loadingBar: {
    width: 200,
    height: 4,
    backgroundColor: LightColors.textSecondary,
    borderRadius: 2,
    overflow: 'hidden',
  },
  loadingProgress: {
    height: '100%',
    width: '100%', // Set initial width to 100% for scaling
    backgroundColor: LightColors.primary,
    borderRadius: 2,
  },
  footer: {
    position: 'absolute',
    bottom: 40,
  },
  footerText: {
    color: LightColors.textSecondary,
    fontSize: 12,
    textAlign: 'center',
  },
});

export default SplashScreenLoader;