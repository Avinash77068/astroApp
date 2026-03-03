/**
 * LoginScreen
 * User login interface with email/password authentication
 * Uses TanStack Query for API calls, no business logic in component
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Input } from '../../../component/customComponent/InputBox';
import { useLogin } from '../../../hooks/useLogin';
import Button from '../../../component/customComponent/Button';
import { GradientWrapper } from '../../../component/customComponent/LinearGradient';

type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
};

type LoginScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'Login'
>;

export const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { mutate: login, isPending, error } = useLogin();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });

  const validateForm = (): boolean => {
    const newErrors = { email: '', password: '' };
    let isValid = true;

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

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = () => {
    if (!validateForm()) {
      return;
    }

    login(
      { email: email.trim(), password },
      {
        onSuccess: () => {
          setEmail('');
          setPassword('');
          setErrors({ email: '', password: '' });
        },
        onError: (err) => {
          Alert.alert('Login Failed', err.message || 'An error occurred');
        },
      }
    );
  };

  return (
    <GradientWrapper>
      <View style={styles.container}>
        <View style={styles.topSection}>
          <Text style={styles.brand}>Jobsly</Text>
        </View>

        {/* Card */}
        <View style={styles.card}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>

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

          {error && <Text style={styles.errorMessage}>{error.message}</Text>}

          <Button
            title="Login"
            onPress={handleLogin}
            loading={isPending}
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
    marginBottom: 24,
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
