import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Animated,
  StyleSheet,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Mail } from 'lucide-react-native';

interface WelcomeScreenProps {
  onNext: () => void;
}

const WelcomeScreen = ({ onNext }: WelcomeScreenProps) => {
  const [phone, setPhone] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <LinearGradient
      colors={['#4a148c', '#6a1b9a']}
      style={styles.container}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo */}
          <Animated.View
            style={[
              styles.logoContainer,
              { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
            ]}
          >
            <View style={styles.logo}>
              <View style={styles.circleOuter} />
              <View style={styles.circleSmallLeft} />
              <View style={styles.circleSmallRight} />
              <View style={styles.smileLine} />
            </View>
          </Animated.View>

          {/* Text */}
          <Animated.View style={[styles.textContainer, { opacity: fadeAnim }]}>
            <Text style={styles.title}>Hi Welcome!</Text>
            <Text style={styles.subtitle}>Submit your Mobile number</Text>
          </Animated.View>

          {/* Form */}
          <Animated.View style={[styles.formContainer, { opacity: fadeAnim }]}>
            <View style={styles.phoneContainer}>
              <View style={styles.countrySelector}>
                <Text style={styles.flag}>🇺🇸</Text>
                <Text style={styles.countryCode}>+1</Text>
                <Text style={styles.dropdownArrow}>▼</Text>
              </View>
              <TextInput
                style={styles.phoneInput}
                placeholder="Enter Mobile Number"
                placeholderTextColor="rgba(255,255,255,0.5)"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
              />
            </View>

            <TouchableOpacity style={styles.sendBtn} onPress={onNext}>
              <Text style={styles.sendBtnText}>Send OTP</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.emailBtn}>
              <Mail size={18} color="white" />
              <Text style={styles.emailBtnText}>Continue with Email ID</Text>
            </TouchableOpacity>

            <Text style={styles.termsText}>
              <Text style={styles.link}>Terms of Use</Text> •{' '}
              <Text style={styles.link}>Privacy Policy</Text>
            </Text>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1 ,width:'100%'},
  contentContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width:'100%',
    paddingHorizontal:20
  },
  logoContainer: {
    marginBottom: 40,
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  circleOuter: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  circleSmallLeft: {
    position: 'absolute',
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.4)',
    left: 20,
    top: 20,
  },
  circleSmallRight: {
    position: 'absolute',
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.4)',
    right: 20,
    top: 20,
  },
  smileLine: {
    position: 'absolute',
    width: 60,
    height: 2,
    borderRadius: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
    top: 40,
    transform: [{ rotate: '10deg' }],
  },
  textContainer: { alignItems: 'center', marginBottom: 40 },
  title: { fontSize: 32, fontWeight: '600', color: 'white', marginBottom: 8 },
  subtitle: { fontSize: 16, color: 'rgba(255,255,255,0.7)', textAlign: 'center' },
  formContainer: { width: '100%', gap: 20 },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    overflow: 'hidden',
  },
  countrySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRightWidth: 1,
    borderRightColor: 'rgba(255,255,255,0.2)',
    gap: 8,
  },
  flag: { fontSize: 20 },
  countryCode: { fontSize: 15, fontWeight: '500', color: 'white' },
  dropdownArrow: { fontSize: 10, color: 'rgba(255,255,255,0.6)' },
  phoneInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: 'white',
    fontSize: 15,
  },
  sendBtn: {
    width: '100%',
    backgroundColor: '#7c4dff',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  sendBtnText: { color: 'white', fontSize: 16, fontWeight: '600' },
  emailBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 12,
  },
  emailBtnText: { color: 'white', fontSize: 15 },
  termsText: { textAlign: 'center', fontSize: 13, color: 'rgba(255,255,255,0.6)', marginTop: 10 },
  link: { color: 'rgba(255,255,255,0.8)' },
});
