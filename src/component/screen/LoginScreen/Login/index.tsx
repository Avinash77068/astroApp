import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function Login({ setIsOtp }: { setIsOtp: (value: boolean) => void }) {
  const [mobile, setMobile] = useState('');

  const handleSendOtp = () => {
    setIsOtp(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Hi Welcome!</Text>
        <Text style={styles.subtitle}>Submit your Mobile number</Text>

        <Text style={styles.loginText}>Log in or Sign up</Text>

        <View style={styles.inputRow}>
          <Text style={styles.countryCode}>🇺🇸 +1</Text>
          <TextInput
            placeholder="Enter Mobile number"
            keyboardType="phone-pad"
            value={mobile}
            onChangeText={setMobile}
            style={styles.input}
          />
        </View>

        <TouchableOpacity style={styles.primaryBtn} onPress={handleSendOtp}>
          <Text style={styles.primaryText}>SEND OTP</Text>
        </TouchableOpacity>

        <Text style={styles.or}>Or</Text>

        <TouchableOpacity style={styles.secondaryBtn}>
          <Text style={styles.secondaryText}>Continue with Email Id</Text>
        </TouchableOpacity>

        <Text style={styles.footer}>
          By signing up, you agree to our Terms of Use and Privacy Policy
        </Text>
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
    backgroundColor: '#E53935',
    borderRadius: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    color: '#fff',
    marginBottom: 20,
  },
  loginText: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  inputRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  countryCode: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 45,
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
  or: {
    textAlign: 'center',
    marginVertical: 15,
    color: '#fff',
  },
  secondaryBtn: {
    borderWidth: 1,
    borderColor: '#fff',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  secondaryText: {
    color: '#fff',
  },
  footer: {
    marginTop: 15,
    fontSize: 10,
    color: '#fff',
    textAlign: 'center',
  },
});
