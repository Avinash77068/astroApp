import React, { useState, useCallback, memo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types/navigation.types';
import { Gender } from '../../types/user.types';
import { ScreenWrapper } from '../../components/ScreenWrapper/ScreenWrapper';
import { Header } from '../../components/Header/Header';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import { useAuth } from '../../hooks/useAuth';
import { validateRequired, validateDate, validateName } from '../../utils/validators';
import { styles } from './styles';
import { strings } from '../../constants/strings';

type ProfileScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Profile'>;
  route: RouteProp<RootStackParamList, 'Profile'>;
};

export const ProfileScreen = memo<ProfileScreenProps>(({ navigation, route }) => {
  const { phone, email } = route.params;
  const { login } = useAuth();
  
  const [fullName, setFullName] = useState('');
  const [place, setPlace] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState<Gender | ''>('');
  
  const [nameError, setNameError] = useState('');
  const [placeError, setPlaceError] = useState('');
  const [dobError, setDobError] = useState('');
  const [genderError, setGenderError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenderSelect = useCallback((selectedGender: Gender) => {
    setGender(selectedGender);
    setGenderError('');
  }, []);

  const handleSubmit = useCallback(async () => {
    setNameError('');
    setPlaceError('');
    setDobError('');
    setGenderError('');

    let hasError = false;

    if (!validateName(fullName)) {
      setNameError(strings.profile.nameError);
      hasError = true;
    }

    if (!validateRequired(place)) {
      setPlaceError(strings.profile.placeError);
      hasError = true;
    }

    if (!validateDate(dateOfBirth)) {
      setDobError(strings.profile.dobError);
      hasError = true;
    }

    if (!gender) {
      setGenderError(strings.profile.genderError);
      hasError = true;
    }

    if (hasError) return;

    try {
      setLoading(true);
      await login(
        { phone, email },
        { fullName, place, dateOfBirth, gender: gender as Gender }
      );
      navigation.replace('Home');
    } catch (error) {
      setNameError('Failed to create profile');
    } finally {
      setLoading(false);
    }
  }, [fullName, place, dateOfBirth, gender, phone, email, login, navigation]);

  return (
    <ScreenWrapper scrollable keyboardAware>
      <View style={styles.container}>
        <Header
          title={strings.profile.title}
          subtitle={strings.profile.subtitle}
          showBack
          onBackPress={() => navigation.goBack()}
        />

        <View style={styles.form}>
          <Input
            label={strings.profile.nameLabel}
            placeholder={strings.profile.namePlaceholder}
            value={fullName}
            onChangeText={setFullName}
            error={nameError}
          />

          <Input
            label={strings.profile.placeLabel}
            placeholder={strings.profile.placePlaceholder}
            value={place}
            onChangeText={setPlace}
            error={placeError}
          />

          <Input
            label={strings.profile.dobLabel}
            placeholder={strings.profile.dobPlaceholder}
            value={dateOfBirth}
            onChangeText={setDateOfBirth}
            keyboardType="numeric"
            error={dobError}
            maxLength={10}
          />

          <View style={styles.genderContainer}>
            <Text style={styles.genderLabel}>{strings.profile.genderLabel}</Text>
            <View style={styles.genderButtons}>
              <TouchableOpacity
                style={[styles.genderButton, gender === 'male' && styles.genderButtonActive]}
                onPress={() => handleGenderSelect('male')}
              >
                <Text style={[styles.genderText, gender === 'male' && styles.genderTextActive]}>
                  {strings.profile.male}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.genderButton, gender === 'female' && styles.genderButtonActive]}
                onPress={() => handleGenderSelect('female')}
              >
                <Text style={[styles.genderText, gender === 'female' && styles.genderTextActive]}>
                  {strings.profile.female}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.genderButton, gender === 'other' && styles.genderButtonActive]}
                onPress={() => handleGenderSelect('other')}
              >
                <Text style={[styles.genderText, gender === 'other' && styles.genderTextActive]}>
                  {strings.profile.other}
                </Text>
              </TouchableOpacity>
            </View>
            {genderError ? <Text style={styles.error}>{genderError}</Text> : null}
          </View>

          <Button
            title={strings.profile.submitButton}
            onPress={handleSubmit}
            loading={loading}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
});

ProfileScreen.displayName = 'ProfileScreen';
