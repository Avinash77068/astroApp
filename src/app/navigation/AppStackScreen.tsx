import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, Image } from 'react-native';

import BottomStackScreen from './BottomStackScreen';
import { useActiveChat } from '../../store/useActiveChat';
import { PhoneCall, VideoIcon } from 'lucide-react-native';
import ChatWithAstrologer from '../../component/screen/ChatScreen/ChatScreen/ChatWithAstrologer';
import { activeUser } from '../../component/screen/HomeScreen/astrologerList/types';

export type AppStackParamList = {
  BottomStack: undefined;
  ChatWithAstrologer: { 
    astrologer: activeUser;
    chatHistory?: any[];
  };
};

const Stack = createNativeStackNavigator<AppStackParamList>();

export default function AppStackScreen() {
  const { activeChat } = useActiveChat();
  const countdownSeconds = 60;
  const showTimer = true;
  const [remainingSeconds, setRemainingSeconds] = useState(countdownSeconds);

  useEffect(() => {
    setRemainingSeconds(countdownSeconds);

    if (!showTimer) {
      return undefined;
    }

    const interval = setInterval(() => {
      setRemainingSeconds(prev => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [activeChat, showTimer, countdownSeconds]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${minutes} : ${secs}`;
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BottomStack"
        component={BottomStackScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ChatWithAstrologer"
        component={ChatWithAstrologer}
        options={{
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {/* Profile Image */}
              <Image
                source={{ uri: activeChat?.image }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  marginRight: 10,
                }}
              />

              {/* Name + Status */}
              <View>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                  {activeChat?.name}
                </Text>
                <Text style={{ fontSize: 12, color: 'green' }}>Online</Text>
              </View>
            </View>
          ),
          headerRight: () => (
            showTimer ? (
              <View style={{ marginHorizontal: 16 }}>
                <Text style={{ fontSize: 16, fontWeight: '600' }}>
                  {formatTime(remainingSeconds)}
                </Text>
              </View>
            ) : (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 16,
                  opacity: 0.3,
                }}
              >
                <PhoneCall />
                <VideoIcon />
              </View>
            )
          ),
        }}
      />
    </Stack.Navigator>
  );
}
