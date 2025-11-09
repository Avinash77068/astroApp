import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
} from 'react-native';
import { ChevronLeft, Search, Check } from 'lucide-react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import ArrowIcons from './Global/ArrowIcons';

interface PersonalDetailScreenProps {
  onComplete: () => void;
}

const PersonalDetailScreen = ({ onComplete }: PersonalDetailScreenProps) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('Aviansh');
  const [dob, setDob] = useState('');
  const [location, setLocation] = useState('');
  const [gender, setGender] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [step]);

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
    else onComplete();
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        {/* <ArrowIcons onOpen={() => {}} onNavigate={() => {}} /> */}
        <View style={styles.header}>
          {/* {step > 1 && ( */}
            <TouchableOpacity onPress={handleBack} style={styles.backBtn}>
              <ChevronLeft size={24} color="white" />
            </TouchableOpacity>
          {/* )} */}
          <Text style={styles.headerTitle}>Personal Detail</Text>
        </View>

        {/* Steps */}
        <Animated.View style={{ opacity: fadeAnim, width: '100%' }}>
          {step === 1 && (
            <View style={styles.stepContainer}>
              <Text style={styles.greeting}>Hey..! {name}</Text>
              <View style={styles.formGroup}>
                <Text style={styles.label}>What's Your Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your name"
                  placeholderTextColor="rgba(255,255,255,0.5)"
                  value={name}
                  onChangeText={setName}
                />
              </View>
            </View>
          )}

          {step === 2 && (
            <View style={styles.stepContainer}>
              <View style={styles.formGroup}>
                <Text style={styles.label}>Date of Birth</Text>
                <View style={styles.dobContainer}>
                  <TextInput
                    style={[styles.input, { flex: 1 }]}
                    placeholder="DD/MM/YYYY"
                    placeholderTextColor="rgba(255,255,255,0.5)"
                    value={dob}
                    onChangeText={setDob}
                  />
                  {dob ? (
                    <View style={styles.helperIcon}>
                      <Check size={18} color="#4caf50" />
                    </View>
                  ) : null}
                </View>
              </View>
            </View>
          )}

          {step === 3 && (
            <View style={styles.stepContainer}>
              <View style={styles.formGroup}>
                <Text style={styles.label}>Place of Birth</Text>
                <View style={styles.searchContainer}>
                  <Search size={20} color="rgba(255,255,255,0.6)" />
                  <TextInput
                    style={[styles.input, { paddingLeft: 32 }]}
                    placeholder="Enter the Location"
                    placeholderTextColor="rgba(255,255,255,0.5)"
                    value={location}
                    onChangeText={setLocation}
                  />
                </View>
              </View>
            </View>
          )}

          {step === 4 && (
            <View style={styles.stepContainer}>
              <View style={styles.formGroup}>
                <Text style={styles.label}>Select the Gender</Text>
                <View style={styles.genderContainer}>
                  {['male', 'female', 'other'].map((g) => (
                    <TouchableOpacity
                      key={g}
                      style={[
                        styles.genderBtn,
                        gender === g && styles.genderActive,
                      ]}
                      onPress={() => setGender(g)}
                    >
                      <Svg width={60} height={60} viewBox="0 0 24 24" stroke="white" fill="none" strokeWidth={2}>
                        {g === 'male' && (
                          <>
                            <Circle cx="10" cy="14" r="6" />
                            <Path d="M14 8l6-6M20 2l-6 6M20 8V2h-6" />
                          </>
                        )}
                        {g === 'female' && (
                          <>
                            <Circle cx="12" cy="8" r="6" />
                            <Path d="M12 14v8M8 18h8" />
                          </>
                        )}
                        {g === 'other' && (
                          <>
                            <Circle cx="12" cy="12" r="6" />
                            <Path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
                          </>
                        )}
                      </Svg>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          )}
        </Animated.View>

        {/* Completion status */}
        {step === 4 && gender && (
          <View style={styles.completion}>
            <Text style={styles.statusText}>Otp Verification is Completed</Text>
            <Text style={styles.statusBadge}>Successfully</Text>
          </View>
        )}

        {/* Footer */}
        <TouchableOpacity
          style={[
            styles.nextBtn,
            ((step === 1 && !name) ||
              (step === 2 && !dob) ||
              (step === 3 && !location) ||
              (step === 4 && !gender)) && { opacity: 0.5 },
          ]}
          disabled={
            (step === 1 && !name) ||
            (step === 2 && !dob) ||
            (step === 3 && !location) ||
            (step === 4 && !gender)
          }
          onPress={handleNext}
        >
          <Text style={styles.nextBtnText}>{step === 4 ? 'Submit' : 'Done'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PersonalDetailScreen;

const styles = StyleSheet.create({
  container: {display:'flex',flexDirection:'column',backgroundColor: '#4a148c',width:'100%',padding: 30   },
  scrollContainer: { flexGrow: 1,  justifyContent: 'center' },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  backBtn: { marginRight: 12,paddingTop: 60 },
  headerTitle: { color: 'white', fontSize: 24, fontWeight: '600' },
  stepContainer: { marginBottom: 30 },
  greeting: { fontSize: 32, fontWeight: '300', color: 'white', marginBottom: 40 },
  formGroup: { marginBottom: 30 },
  label: { fontSize: 16, fontWeight: '500', color: 'white', marginBottom: 12 },
  input: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: 'white',
    fontSize: 15,
  },
  dobContainer: { position: 'relative' },
  helperIcon: {
    position: 'absolute',
    right: 16,
    bottom: 14,
    backgroundColor: 'rgba(76,175,80,0.2)',
    borderRadius: 16,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: { position: 'relative' },
  genderContainer: { flexDirection: 'row', justifyContent: 'center', gap: 20, marginTop: 40 },
  genderBtn: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
    borderRadius: 16,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  genderActive: {
    backgroundColor: 'rgba(124,77,255,0.3)',
    borderColor: '#7c4dff',
    shadowColor: '#7c4dff',
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  completion: { alignItems: 'center', marginVertical: 20 },
  statusText: { color: 'white', fontSize: 15 },
  statusBadge: { color: '#4caf50', fontSize: 14, fontWeight: '600' },
  nextBtn: {
    backgroundColor: '#7c4dff',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  nextBtnText: { color: 'white', fontSize: 16, fontWeight: '600' },
});
