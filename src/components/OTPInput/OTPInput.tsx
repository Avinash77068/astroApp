import React, { memo, useRef, useEffect } from 'react';
import { View, TextInput } from 'react-native';
import { styles } from './styles';

interface OTPInputProps {
  value: string;
  onChange: (otp: string) => void;
  length?: number;
}

export const OTPInput = memo<OTPInputProps>(({
  value,
  onChange,
  length = 4,
}) => {
  const inputRefs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (text: string, index: number) => {
    const newValue = value.split('');
    newValue[index] = text;
    const newOTP = newValue.join('');
    onChange(newOTP);

    if (text && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      {Array.from({ length }).map((_, index) => (
        <TextInput
          key={index}
          ref={(ref) => {
            inputRefs.current[index] = ref;
          }}
          style={styles.input}
          value={value[index] || ''}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          keyboardType="number-pad"
          maxLength={1}
          selectTextOnFocus
        />
      ))}
    </View>
  );
});

OTPInput.displayName = 'OTPInput';
