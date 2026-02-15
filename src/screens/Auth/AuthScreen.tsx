import React, { useState, useCallback, memo } from 'react';
import { View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation.types';
import { ScreenWrapper } from '../../components/ScreenWrapper/ScreenWrapper';
import { Header } from '../../components/Header/Header';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import { validateEmail, validatePhone } from '../../utils/validators';
import { authService } from '../../services/authService';
import { styles } from './styles';
import { strings } from '../../constants/strings';

type AuthScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Auth'>;
};

export const AuthScreen = memo<AuthScreenProps>(({ navigation }) => {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleContinue = useCallback(async () => {
    setPhoneError('');
    setEmailError('');

    let hasError = false;

    if (!validatePhone(phone)) {
      setPhoneError(strings.auth.phoneError);
      hasError = true;
    }

    if (!validateEmail(email)) {
      setEmailError(strings.auth.emailError);
      hasError = true;
    }

    if (hasError) return;

    try {
      setLoading(true);
      await authService.sendOTP({ phone, email });
      navigation.navigate('OTP', { phone, email });
    } catch (error) {
      setEmailError('Failed to send OTP');
    } finally {
      setLoading(false);
    }
  }, [phone, email, navigation]);

  return (
    <ScreenWrapper scrollable keyboardAware>
      <View style={styles.container}>
        <Header title={strings.auth.title} subtitle={strings.auth.subtitle} />

        <View style={styles.form}>
          <Input
            label={strings.auth.phoneLabel}
            placeholder={strings.auth.phonePlaceholder}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            error={phoneError}
            maxLength={10}
          />

          <Input
            label={strings.auth.emailLabel}
            placeholder={strings.auth.emailPlaceholder}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            error={emailError}
          />

          <Button
            title={strings.auth.continueButton}
            onPress={handleContinue}
            loading={loading}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
});

AuthScreen.displayName = 'AuthScreen';
