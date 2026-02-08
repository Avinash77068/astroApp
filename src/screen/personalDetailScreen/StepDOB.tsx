import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Check } from 'lucide-react-native';

export default function StepDOB({ formData, setFormData }: { formData: { dob: string }; setFormData: (formData: { dob: string }) => void }) {
  return (
    <View style={styles.stepContainer}>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Date of Birth</Text>
        <View style={styles.dobContainer}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="DD/MM/YYYY"
            placeholderTextColor="rgba(255,255,255,0.5)"
            value={formData.dob}
            onChangeText={dob => setFormData({ ...formData, dob })}
          />
          {formData.dob ? (
            <View style={styles.helperIcon}>
              <Check size={18} color="#4caf50" />
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  stepContainer: { marginBottom: 30 },
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
});
