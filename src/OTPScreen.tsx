import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ChevronLeft } from 'lucide-react-native';

interface OTPScreenProps {
  onVerify: () => void;
  onChangeNumber?: () => void;
}

const { width, height } = Dimensions.get('window');

const OTPScreen = ({ onVerify, onChangeNumber }: OTPScreenProps) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const starsAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(starsAnim, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 3) {
      const nextInput = inputRefs[index + 1];
      nextInput?.focus();
    }
  };

  const handleKeyPress = (index: number, key: string) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = inputRefs[index - 1];
      prevInput?.focus();
    }
  };

  const inputRefs: (TextInput | null)[] = [];

  return (
    <LinearGradient colors={['#4a148c', '#6a1b9a']} style={styles.container}>
      {/* Stars */}
      <View style={StyleSheet.absoluteFill}>
        {[...Array(15)].map((_, i) => {
          const top = Math.random() * height;
          const left = Math.random() * width;
          const size = Math.random() * 3 + 1;
          return (
            <Animated.View
              key={i}
              style={[
                styles.star,
                {
                  width: size,
                  height: size,
                  top,
                  left,
                  opacity: starsAnim.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: [0.3, 1, 0.3],
                  }),
                },
              ]}
            />
          );
        })}
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* OTP Icon */}
        <View style={styles.iconContainer}>
          <View style={styles.otpIcon}>
            <Text style={{color:'white', fontSize:40}}>🔒</Text>
          </View>
        </View>

        {/* OTP Text */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>OTP Verification</Text>
          <Text style={styles.subtitle}>A 4 digit code has been sent to your number</Text>
        </View>

        {/* OTP Inputs */}
        <View style={styles.inputsContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref:any) => (inputRefs[index] = ref)}
              style={styles.input}
              value={digit}
              onChangeText={(text) => handleOtpChange(index, text)}
              keyboardType="numeric"
              maxLength={1}
              onKeyPress={({ nativeEvent }) => handleKeyPress(index, nativeEvent.key)}
              placeholder=""
              placeholderTextColor="rgba(255,255,255,0.5)"
            />
          ))}
        </View>

        {/* Verify Button */}
        <TouchableOpacity style={styles.verifyBtn} onPress={onVerify}>
          <Text style={{color:'white', fontWeight:'600'}}>Verify OTP</Text>
        </TouchableOpacity>

        {/* Change Number Button */}
        <TouchableOpacity style={styles.changeBtn} onPress={onChangeNumber}>
          <ChevronLeft size={18} color="white" />
          <Text style={{color:'white', fontWeight:'500'}}>Change Mobile Number</Text>
        </TouchableOpacity>

        {/* Resend */}
        <Text style={styles.resendText}>
          Didn't receive code? <Text style={styles.resendLink}>Resend</Text>
        </Text>
      </ScrollView>
    </LinearGradient>
  );
};

export default OTPScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 30 },
  star: { position: 'absolute', borderRadius: 50, backgroundColor: 'white' },
  iconContainer: { marginBottom: 30 },
  otpIcon: { width: 100, height: 100, borderRadius:50, alignItems:'center', justifyContent:'center', backgroundColor:'rgba(255,255,255,0.1)' },
  textContainer: { marginBottom: 30, alignItems: 'center' },
  title: { color: 'white', fontSize: 28, fontWeight: '600', marginBottom: 12 },
  subtitle: { color: 'rgba(255,255,255,0.7)', fontSize: 15, textAlign: 'center' },
  inputsContainer: { flexDirection: 'row', gap: 16, marginBottom: 20 },
  input: {
    width: 56,
    height: 56,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderColor: 'rgba(255,255,255,0.2)',
    borderWidth: 2,
    borderRadius: 12,
    textAlign: 'center',
    fontSize: 24,
    color: 'white',
    fontWeight: '600',
    marginHorizontal: 4,
  },
  verifyBtn: {
    width: '100%',
    padding: 16,
    backgroundColor: '#7c4dff',
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  changeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 20,
  },
  resendText: { color: 'rgba(255,255,255,0.7)', fontSize: 14, textAlign: 'center' },
  resendLink: { color: '#7c4dff', fontWeight: '600' },
});
