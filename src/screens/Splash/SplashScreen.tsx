import React, { useEffect, memo } from 'react';
import { View, Text, Animated } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation.types';
import { useAuth } from '../../hooks/useAuth';
import { delay } from '../../utils/helpers';
import { styles } from './styles';
import { strings } from '../../constants/strings';

type SplashScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Splash'>;
};

export const SplashScreen = memo<SplashScreenProps>(({ navigation }) => {
  const { isLoggedIn, loading } = useAuth();
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    if (!loading) {
      checkAuthAndNavigate();
    }
  }, [loading, isLoggedIn]);

  const checkAuthAndNavigate = async () => {
    await delay(2000);
    
    if (isLoggedIn) {
      navigation.replace('Home');
    } else {
      navigation.replace('Auth');
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <Text style={styles.logo}>⭐</Text>
        <Text style={styles.appName}>{strings.app.name}</Text>
        <Text style={styles.tagline}>{strings.app.tagline}</Text>
      </Animated.View>
    </View>
  );
});

SplashScreen.displayName = 'SplashScreen';
