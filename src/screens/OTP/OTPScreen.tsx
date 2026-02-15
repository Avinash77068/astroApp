import React, { useState, useCallback, useEffect, memo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types/navigation.types';
import { ScreenWrapper } from '../../components/ScreenWrapper/ScreenWrapper';
import { Header } from '../../components/Header/Header';
import { OTPInput } from '../../components/OTPInput/OTPInput';
import { Button } from '../../components/Button/Button';
import { useCountdown } from '../../hooks/useCountdown';
import { validateOTP } from '../../utils/validators';
import { formatTimer } from '../../utils/formatters';
import { authService } from '../../services/authService';
import { styles } from './styles';
import { strings } from '../../constants/strings';

type OTPScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'OTP'>;
  route: RouteProp<RootStackParamList, 'OTP'>;
};

const RESEND_TIMER = 60;

export const OTPScreen = memo<OTPScreenProps>(({ navigation, route }) => {
  const { phone, email } = route.params;
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { seconds, isActive, start } = useCountdown(RESEND_TIMER);

  useEffect(() => {
    start();
  }, []);

  const handleVerify = useCallback(async () => {
    setError('');

    if (!validateOTP(otp)) {
      setError(strings.otp.otpError);
      return;
    }

    try {
      setLoading(true);
      const response = await authService.verifyOTP(phone, otp);
      
      if (response.success) {
        navigation.navigate('Profile', { phone, email });
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError('Verification failed');
    } finally {
      setLoading(false);
    }
  }, [otp, phone, email, navigation]);

  const handleResend = useCallback(async () => {
    if (isActive) return;

    try {
      await authService.sendOTP({ phone, email });
      setOtp('');
      setError('');
      start();
    } catch (error) {
      setError('Failed to resend OTP');
    }
  }, [isActive, phone, email, start]);

  return (
    <ScreenWrapper scrollable keyboardAware>
      <View style={styles.container}>
        <Header
          title={strings.otp.title}
          subtitle={`${strings.otp.subtitle} ${phone}`}
          showBack
          onBackPress={() => navigation.goBack()}
        />

        <View style={styles.content}>
          <OTPInput value={otp} onChange={setOtp} length={4} />

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <Button
            title={strings.otp.verifyButton}
            onPress={handleVerify}
            loading={loading}
            disabled={otp.length !== 4}
          />

          <View style={styles.resendContainer}>
            <Text style={styles.resendText}>{strings.otp.resendText}</Text>
            {isActive ? (
              <Text style={styles.timer}>
                {strings.otp.resendTimer} {formatTimer(seconds)}
              </Text>
            ) : (
              <TouchableOpacity onPress={handleResend}>
                <Text style={styles.resendButton}>{strings.otp.resendButton}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
});

OTPScreen.displayName = 'OTPScreen';
