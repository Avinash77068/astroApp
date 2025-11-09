import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Animated,
  ScrollView,
} from 'react-native';

import ProgressButton from './ProgressButton';
import StepName from './StepName';
import StepDOB from './StepDOB';
import StepLocation from './StepLocation';
import StepGender from './StepGender';
interface Props {
  onComplete: () => void;
}
interface setFormData {
    name: string;
    dob: string;
    location: string;
    gender: string;
}

export default function PersonalDetailScreen({ onComplete }: Props) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<setFormData>({
    name: '',
    dob: '',
    location: '',
    gender: '',
  });

  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [step]);

  const handleNext = () => (step < 4 ? setStep(step + 1) : onComplete());
  const handleBack = () => step > 1 && setStep(step - 1);

  const StepComponent = [StepName, StepDOB, StepLocation, StepGender][step - 1];
  const isDisabled =
    (step === 1 && !formData.name) ||
    (step === 2 && !formData.dob) ||
    (step === 3 && !formData.location) ||
    (step === 4 && !formData.gender);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>

        <Animated.View style={styles.subContainer}>
          <StepComponent formData={formData} setFormData={setFormData} />
        </Animated.View>

        <ProgressButton
          disabled={isDisabled}
          onPress={handleNext}
          label={step === 4 ? 'Submit' : 'Done'}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#4a148c',position: 'absolute',top: 0,width: '100%',paddingHorizontal: 20 },
  scrollContainer: { flexGrow: 1, justifyContent: 'center' },
  subContainer:{flex: 1, backgroundColor: '#4a148c',paddingTop: 140, width: '100%'},
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 40,
    columnGap: 12,
  },
  headerTitle: { color: 'white', fontSize: 24, fontWeight: '600' },
});
