import React from 'react';
import { View, Text } from 'react-native';
import { LightColors } from '../../../constant/colors';

const ChatScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: LightColors.background,
      }}
    >
      <Text>ChatScreen</Text>
    </View>
  );
};

export default ChatScreen;
