import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function OtpScreen({ navigation }: any) {
  const [otp, setOtp] = useState(['', '', '', '']);

  const handleChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>OTP Verification</Text>
        <Text style={styles.subtitle}>
          A 4 digit code has been sent to your number
        </Text>

        <Text style={styles.timer}>00:56</Text>

        <View style={styles.otpRow}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              maxLength={1}
              keyboardType="number-pad"
              value={digit}
              onChangeText={value => handleChange(value, index)}
              style={styles.otpInput}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.primaryBtn}>
          <Text style={styles.primaryText}>Verify OTP</Text>
        </TouchableOpacity>

        <Text style={styles.resend}>
          If you didn’t receive a code?{' '}
          <Text style={{ fontWeight: 'bold' }}>Resend</Text>
        </Text>

        <TouchableOpacity style={styles.secondaryBtn}>
          <Text style={styles.secondaryText}>Change Mobile Number</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E53935',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    borderRadius: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    color: '#fff',
    marginBottom: 10,
  },
  timer: {
    textAlign: 'center',
    color: '#fff',
    marginBottom: 15,
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  otpInput: {
    backgroundColor: '#fff',
    width: 50,
    height: 55,
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 18,
  },
  primaryBtn: {
    backgroundColor: '#FFC107',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  primaryText: {
    fontWeight: 'bold',
  },
  resend: {
    marginTop: 15,
    textAlign: 'center',
    color: '#fff',
  },
  secondaryBtn: {
    borderWidth: 1,
    borderColor: '#fff',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
  },
  secondaryText: {
    color: '#fff',
  },
});
