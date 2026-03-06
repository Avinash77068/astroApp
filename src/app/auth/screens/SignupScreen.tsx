
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useSignup } from '../../../hooks/useSignup';
import NameStep from '../../../component/onboarding/NameStep';
import PlaceStep from '../../../component/onboarding/PlaceStep';
import DateStep from '../../../component/onboarding/DateStep';
import GenderStep from '../../../component/onboarding/GenderStep';

type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
};

type SignupScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'Signup'
>;

export const SignupScreen: React.FC = () => {
  const navigation = useNavigation<SignupScreenNavigationProp>();
  const { mutate: signup, isPending, error } = useSignup();

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    place: '',
    dateOfBirth: '',
    gender: '',
    email: '',
    phone: '',
  });

  const handleNameNext = (name: string) => {
    setFormData(prev => ({...prev, name}));
    setCurrentStep(1);
  };

  const handlePlaceNext = (place: string) => {
    setFormData(prev => ({...prev, place}));
    setCurrentStep(2);
  };

  const handleDateNext = (dateOfBirth: string) => {
    setFormData(prev => ({...prev, dateOfBirth}));
    setCurrentStep(3);
  };

  const handleGenderNext = async (gender: string) => {
    const finalData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.name.toLowerCase().slice(0, 3) + '@123',
      place: formData.place,
      dateOfBirth: formData.dateOfBirth,
      gender,
    };

    signup(
      finalData,
      {
        onSuccess: () => {
          Alert.alert(
            'Success',
            'Profile created successfully!',
            [
              {
                text: 'OK',
                onPress: () => navigation.navigate('Login'),
              },
            ]
          );
        },
        onError: (err) => {
          Alert.alert('Signup Failed', err.message || 'An error occurred');
        },
      }
    );
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <NameStep 
            onNext={handleNameNext} 
            initialValue={formData.name} 
          />
        );
      case 1:
        return (
          <PlaceStep
            onNext={handlePlaceNext}
            onBack={handleBack}
            initialValue={formData.place}
          />
        );
      case 2:
        return (
          <DateStep
            onNext={handleDateNext}
            onBack={handleBack}
            initialValue={formData.dateOfBirth}
          />
        );
      case 3:
        return (
          <GenderStep
            onNext={handleGenderNext}
            onBack={handleBack}
            initialValue={formData.gender}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          {[0, 1, 2, 3].map(step => (
            <View
              key={step}
              style={[
                styles.progressDot,
                step <= currentStep && styles.progressDotActive,
              ]}
            />
          ))}
        </View>
      </View>

      {renderStep()}
      
      {isPending && (
        <View style={styles.loadingOverlay}>
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color="#FF7A18" />
            <Text style={styles.loadingText}>Setting up your profile...</Text>
          </View>
        </View>
      )}


      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.linkText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F2',
  },
  progressContainer: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  progressBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  progressDot: {
    width: 40,
    height: 4,
    backgroundColor: '#ddd',
    borderRadius: 2,
  },
  progressDotActive: {
    backgroundColor: '#FF7A18',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingBox: {
    backgroundColor: '#F4E6D7',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    color: '#2C2C2C',
    fontSize: 16,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#666',
  },
  linkText: {
    fontSize: 14,
    color: '#FF7A18',
    fontWeight: '600',
  },
});
