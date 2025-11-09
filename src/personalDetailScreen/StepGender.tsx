import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

export default function StepGender({ formData, setFormData }) {
  return (
    <View style={styles.stepContainer}>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Select the Gender</Text>
        <View style={styles.genderContainer}>
          {['male', 'female', 'other'].map(g => (
            <TouchableOpacity
              key={g}
              style={[
                styles.genderBtn,
                formData.gender === g && styles.genderActive,
              ]}
              onPress={() => setFormData({ ...formData, gender: g })}
            >
              <Svg
                width={60}
                height={60}
                viewBox="0 0 24 24"
                stroke="white"
                fill="none"
                strokeWidth={2}
              >
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
  );
}

const styles = StyleSheet.create({
  stepContainer: { marginBottom: 30 },
  formGroup: { marginBottom: 30 },
  label: { fontSize: 16, fontWeight: '500', color: 'white', marginBottom: 12 },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: 40,
    width: '100%',
    alignItems: 'center',
  },
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
});
