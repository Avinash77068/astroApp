/**
 * LoginScreen
 * Email + Phone Login with Toggle
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Input } from '../../../component/customComponent/InputBox';
import { useLogin } from '../../../hooks/useLogin';
import { useSendOtp } from '../../../hooks/useSendOtp';
import Button from '../../../component/customComponent/Button';
import { GradientWrapper } from '../../../component/customComponent/LinearGradient';

type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  Otp: { phone: string };
};

type LoginScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'Login'
>;

export const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { mutate: login, isPending: isLoginPending, error: loginError } = useLogin();
  const { mutate: sendOtp, isPending: isOtpPending, error: otpError } = useSendOtp();

  const [loginMode, setLoginMode] = useState<'email' | 'phone'>('email');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    phone: '',
  });

  const validateForm = (): boolean => {
    const newErrors = { email: '', password: '', phone: '' };
    let isValid = true;

    if (loginMode === 'email') {
      if (!email.trim()) {
        newErrors.email = 'Email is required';
        isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        newErrors.email = 'Email is invalid';
        isValid = false;
      }

      if (!password.trim()) {
        newErrors.password = 'Password is required';
        isValid = false;
      } else if (password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
        isValid = false;
      }
    }

    if (loginMode === 'phone') {
      if (!phone.trim()) {
        newErrors.phone = 'Phone number is required';
        isValid = false;
      } else if (phone.length < 10) {
        newErrors.phone = 'Invalid phone number';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = () => {
    if (!validateForm()) return;

    if (loginMode === 'email') {
      login(
        { email: email.trim(), password },
        {
          onError: err => {
            Alert.alert('Login Failed', err.message || 'Something went wrong');
          },
        },
      );
    }

    if (loginMode === 'phone') {
      sendOtp(
        { phone: phone.trim() },
        {
          onSuccess: () => {
            navigation.navigate('Otp', { phone: phone.trim() });
          },
          onError: err => {
            Alert.alert('Error', err.message || 'Failed to send OTP');
          },
        },
      );
    }
  };

  return (
    <GradientWrapper>
      <View style={styles.container}>
        {/* Top Section */}
        <View style={styles.topSection}>
          <Text style={styles.brand}>Jobsly</Text>
        </View>

        {/* Card */}
        <View style={styles.card}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>

          {/* Toggle */}
          <View style={styles.switchContainer}>
            <TouchableOpacity
              style={[
                styles.switchButton,
                loginMode === 'email' && styles.activeSwitch,
              ]}
              onPress={() => setLoginMode('email')}
            >
              <Text
                style={[
                  styles.switchText,
                  loginMode === 'email' && styles.activeSwitchText,
                ]}
              >
                Email
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.switchButton,
                loginMode === 'phone' && styles.activeSwitch,
              ]}
              onPress={() => setLoginMode('phone')}
            >
              <Text
                style={[
                  styles.switchText,
                  loginMode === 'phone' && styles.activeSwitchText,
                ]}
              >
                Phone
              </Text>
            </TouchableOpacity>
          </View>

          {/* Email Login */}
          {loginMode === 'email' && (
            <>
              <Input
                label="Email"
                placeholder="Enter your email"
                value={email}
                onChangeText={text => {
                  setEmail(text);
                  setErrors(prev => ({ ...prev, email: '' }));
                }}
                error={errors.email}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <Input
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChangeText={text => {
                  setPassword(text);
                  setErrors(prev => ({ ...prev, password: '' }));
                }}
                error={errors.password}
                secureTextEntry
              />
            </>
          )}

          {/* Phone Login */}
          {loginMode === 'phone' && (
            <Input
              label="Phone Number"
              placeholder="Enter your phone number"
              value={phone}
              onChangeText={text => {
                setPhone(text);
                setErrors(prev => ({ ...prev, phone: '' }));
              }}
              error={errors.phone}
              keyboardType="phone-pad"
            />
          )}

          {(loginError || otpError) && (
            <Text style={styles.errorMessage}>
              {loginError?.message || otpError?.message}
            </Text>
          )}

          <Button
            title={loginMode === 'email' ? 'Login' : 'Send OTP'}
            onPress={handleLogin}
            loading={isLoginPending || isOtpPending}
            style={styles.loginButton}
          />

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.linkText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </GradientWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  topSection: {
    height: '35%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  brand: {
    fontSize: 28,
    color: '#fff',
    fontWeight: '700',
  },

  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },

  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#222',
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 14,
    color: '#777',
    marginBottom: 20,
  },

  switchContainer: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    marginBottom: 20,
  },

  switchButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 12,
  },

  activeSwitch: {
    backgroundColor: '#5A4FCF',
  },

  switchText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },

  activeSwitchText: {
    color: '#fff',
  },

  loginButton: {
    marginTop: 12,
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },

  footerText: {
    fontSize: 14,
    color: '#666',
  },

  linkText: {
    fontSize: 14,
    color: '#5A4FCF',
    fontWeight: '600',
  },

  errorMessage: {
    fontSize: 13,
    color: '#ff3b30',
    marginBottom: 10,
    textAlign: 'center',
  },
});
