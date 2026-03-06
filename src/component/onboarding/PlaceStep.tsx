import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from 'react-native';
import {MapPin} from 'lucide-react-native';

interface PlaceStepProps {
  onNext: (place: string) => void;
  onBack: () => void;
  initialValue?: string;
}

export default function PlaceStep({
  onNext,
  onBack,
  initialValue = '',
}: PlaceStepProps) {
  const [place, setPlace] = useState(initialValue);

  const handleNext = () => {
    if (place.trim()) {
      onNext(place.trim());
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <MapPin size={48} color="#FF7A18" />
        </View>

        <Text style={styles.title}>Where are you from?</Text>
        <Text style={styles.subtitle}>
          Enter your birth place or current location
        </Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter your city or location"
            placeholderTextColor="#999"
            value={place}
            onChangeText={setPlace}
            autoCapitalize="words"
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, !place.trim() && styles.buttonDisabled]}
            onPress={handleNext}
            disabled={!place.trim()}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
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
  inputContainer: {
    marginBottom: 24,
    width: '100%',
  },
  input: {
    backgroundColor: '#F4E6D7',
    borderRadius: 10,
    padding: 16,
    fontSize: 16,
    color: '#2C2C2C',
    borderWidth: 1,
    borderColor: '#ddd',
    width: '100%',
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
