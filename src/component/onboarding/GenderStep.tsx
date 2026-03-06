import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Users} from 'lucide-react-native';

interface GenderStepProps {
  onNext: (gender: string) => void;
  onBack: () => void;
  initialValue?: string;
}

export default function GenderStep({
  onNext,
  onBack,
  initialValue = '',
}: GenderStepProps) {
  const [selectedGender, setSelectedGender] = useState(initialValue);

  const genders = [
    {value: 'male', label: 'Male', emoji: '👨'},
    {value: 'female', label: 'Female', emoji: '👩'},
    {value: 'other', label: 'Other', emoji: '🧑'},
  ];

  const handleNext = () => {
    if (selectedGender) {
      onNext(selectedGender);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Users size={48} color="#FF7A18" />
        </View>

        <Text style={styles.title}>Select your gender</Text>
        <Text style={styles.subtitle}>
          This helps us provide personalized predictions
        </Text>

        <View style={styles.genderContainer}>
          {genders.map(gender => (
            <TouchableOpacity
              key={gender.value}
              style={[
                styles.genderOption,
                selectedGender === gender.value && styles.genderOptionSelected,
              ]}
              onPress={() => setSelectedGender(gender.value)}>
              <Text style={styles.genderEmoji}>{gender.emoji}</Text>
              <Text
                style={[
                  styles.genderLabel,
                  selectedGender === gender.value && styles.genderLabelSelected,
                ]}>
                {gender.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, !selectedGender && styles.buttonDisabled]}
            onPress={handleNext}
            disabled={!selectedGender}>
            <Text style={styles.buttonText}>Complete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F2',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F4E6D7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C2C2C',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
  },
  genderContainer: {
    marginBottom: 24,
    width: '100%',
  },
  genderOption: {
    backgroundColor: '#F4E6D7',
    borderRadius: 10,
    padding: 20,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ddd',
  },
  genderOptionSelected: {
    borderColor: '#FF7A18',
    backgroundColor: '#FFE8D6',
  },
  genderEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  genderLabel: {
    fontSize: 16,
    color: '#2C2C2C',
    fontWeight: '600',
  },
  genderLabelSelected: {
    color: '#FF7A18',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 16,
    width: '100%',
  },
  backButton: {
    flex: 1,
    backgroundColor: '#F4E6D7',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  backButtonText: {
    color: '#2C2C2C',
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    flex: 1,
    backgroundColor: '#FF7A18',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
