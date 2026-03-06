import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import {Calendar} from 'lucide-react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface DateStepProps {
  onNext: (date: string) => void;
  onBack: () => void;
  initialValue?: string;
}

export default function DateStep({
  onNext,
  onBack,
  initialValue,
}: DateStepProps) {
  const [date, setDate] = useState(
    initialValue ? new Date(initialValue) : new Date(),
  );

  const onChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleNext = () => {
    const formattedDate = date.toISOString().split('T')[0];
    onNext(formattedDate);
  };

  const formatDate = (d: Date) => {
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Calendar size={48} color="#FF7A18" />
        </View>

        <Text style={styles.title}>When were you born?</Text>
        <Text style={styles.subtitle}>
          Select your date of birth for accurate predictions
        </Text>

        <TouchableOpacity style={styles.dateButton}>
          <Text style={styles.dateText}>{formatDate(date)}</Text>
        </TouchableOpacity>

        <DateTimePicker
          value={date}
          mode="date"
          display="spinner"
          onChange={onChange}
          maximumDate={new Date()}
          minimumDate={new Date(1900, 0, 1)}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>Continue</Text>
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
  dateButton: {
    backgroundColor: '#F4E6D7',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#ddd',
    width: '100%',
  },
  dateText: {
    fontSize: 20,
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
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
