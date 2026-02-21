import { View, Text } from 'react-native';
import React from 'react';
import { LightColors } from '../../../constant/colors';

export default function KundliFormScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: LightColors.background,
      }}
    >
      <Text>KundliFormScreen</Text>
    </View>
  );
}
