import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Search } from 'lucide-react-native';

export default function StepLocation({ formData, setFormData }) {
  return (
    <View style={styles.stepContainer}>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Place of Birth</Text>
        <View style={styles.inputContainer}>
          <Search
            size={20}
            color="rgba(255,255,255,0.6)"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter the Location"
            placeholderTextColor="rgba(255,255,255,0.5)"
            value={formData.location}
            onChangeText={location => setFormData({ ...formData, location })}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  stepContainer: { marginBottom: 30 },
  formGroup: { marginBottom: 30 },
  label: { fontSize: 16, fontWeight: '500', color: 'white', marginBottom: 12 },
  inputContainer: {
    position: 'relative',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  searchIcon: {
    position: 'absolute',
    left: 12,
    zIndex: 1,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 40,
    color: 'white',
    fontSize: 15,
  },
});
