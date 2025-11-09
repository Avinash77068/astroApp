import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function ProgressButton({ label, onPress, disabled } :{label: string,onPress: () => void,disabled: boolean}) {
  return (
    <TouchableOpacity
      style={[styles.nextBtn, disabled && { opacity: 0.5 }]}
      disabled={disabled}
      onPress={onPress}
    >
      <Text style={styles.nextBtnText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  nextBtn: {
    backgroundColor: '#7c4dff',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  nextBtnText: { color: 'white', fontSize: 16, fontWeight: '600' },
});
