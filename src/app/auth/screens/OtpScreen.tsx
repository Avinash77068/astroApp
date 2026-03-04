/**
 * OtpScreen
 * OTP verification for phone login
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GradientWrapper } from '../../../component/customComponent/LinearGradient';
import Button from '../../../component/customComponent/Button';
import { useAuthStore } from '../../../store/authStore';

type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  Otp: { phone: string };
};

type OtpScreenProps = NativeStackScreenProps<AuthStackParamList, 'Otp'>;

export const OtpScreen: React.FC<OtpScreenProps> = ({ route, navigation }) => {
  const { phone } = route.params;
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const setAuth = useAuthStore((state) => state.setAuth);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleOtpChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      Alert.alert('Error', 'Please enter complete OTP');
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Implement OTP verification API call
      await new Promise<void>(resolve => setTimeout(() => resolve(), 1500));
      // After successful OTP verification, authenticate the user
      // This will switch the navigator to the main app
      await setAuth('dummy-token', { id: '1', name: 'User', email: 'user@example.com' });
      Alert.alert('Success', 'OTP verified successfully!');
    } catch (error) {
      Alert.alert('Error', 'Invalid OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = () => {
    if (timer > 0) return;

    setTimer(60);
    setOtp(['', '', '', '', '', '']);
    Alert.alert('Success', 'OTP sent successfully!');
    // TODO: Implement resend OTP API call
  };

  return (
    <GradientWrapper>
      <View style={styles.container}>
        <View style={styles.topSection}>
          <Text style={styles.brand}>Jobsly</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>Verify OTP</Text>
          <Text style={styles.subtitle}>
            Enter the 6-digit code sent to{'\n'}
            <Text style={styles.phone}>{phone}</Text>
          </Text>

          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={ref => {
                  inputRefs.current[index] = ref;
                }}
                style={[styles.otpInput, digit && styles.otpInputFilled]}
                value={digit}
                onChangeText={value => handleOtpChange(value, index)}
                onKeyPress={e => handleKeyPress(e, index)}
                keyboardType="number-pad"
                maxLength={1}
                autoFocus={index === 0}
              />
            ))}
          </View>

          <Button
            title="Verify OTP"
            onPress={handleVerifyOtp}
            loading={isLoading}
            style={styles.verifyButton}
          />

          <View style={styles.resendContainer}>
            {timer > 0 ? (
              <Text style={styles.timerText}>
                Resend OTP in <Text style={styles.timer}>{timer}s</Text>
              </Text>
            ) : (
              <TouchableOpacity onPress={handleResendOtp}>
                <Text style={styles.resendText}>Resend OTP</Text>
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Text style={styles.backText}>Change Phone Number</Text>
          </TouchableOpacity>
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
    height: '30%',
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
    marginBottom: 8,
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 14,
    color: '#777',
    marginBottom: 32,
    textAlign: 'center',
    lineHeight: 20,
  },

  phone: {
    fontWeight: '600',
    color: '#5A4FCF',
  },

  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },

  otpInput: {
    width: 50,
    height: 56,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    color: '#222',
  },

  otpInputFilled: {
    borderColor: '#5A4FCF',
    backgroundColor: '#f8f7ff',
  },

  verifyButton: {
    marginBottom: 20,
  },

  resendContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },

  timerText: {
    fontSize: 14,
    color: '#666',
  },

  timer: {
    fontWeight: '600',
    color: '#5A4FCF',
  },

  resendText: {
    fontSize: 14,
    color: '#5A4FCF',
    fontWeight: '600',
  },

  backButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },

  backText: {
    fontSize: 14,
    color: '#999',
    textDecorationLine: 'underline',
  },
});
