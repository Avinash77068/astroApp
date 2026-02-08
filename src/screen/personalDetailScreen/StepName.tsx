import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function StepName({ formData, setFormData }: { formData: { name: string; dob: string; location: string; gender: string; }; setFormData: (formData: { name: string; dob: string; location: string; gender: string; }) => void; }) {
  return (
    <View style={styles.stepContainer}>
      <Text style={styles.greeting}>Hey..! {formData.name || 'User'}</Text>
      <View style={styles.formGroup}>
        <Text style={styles.label}>What's Your Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          placeholderTextColor="rgba(255,255,255,0.5)"
          value={formData.name}
          onChangeText={name => setFormData({ ...formData, name })}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  stepContainer: { marginBottom: 30 },
  greeting: {
    fontSize: 32,
    fontWeight: '300',
    color: 'white',
    marginBottom: 40,
  },
  formGroup: { marginBottom: 30 },
  label: { fontSize: 16, fontWeight: '500', color: 'white', marginBottom: 12 },
  input: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 40,
    color: 'white',
    fontSize: 15,
  },
});
