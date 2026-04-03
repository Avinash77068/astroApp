import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, Image } from 'react-native';

import BottomStackScreen from './BottomStackScreen';
import { useActiveChat } from '../../store/useActiveChat';
import { PhoneCall, VideoIcon } from 'lucide-react-native';
import ChatWithAstrologer from '../../component/screen/ChatScreen/ChatScreen/ChatWithAstrologer';
import GenericScreen from '../../component/screen/GenericScreen/GenericScreen';
import { activeUser } from '../../component/screen/HomeScreen/astrologerList/types';

export type AppStackParamList = {
  BottomStack: undefined;
  ChatWithAstrologer: { 
    astrologer: activeUser;
    chatHistory?: any[];
  };
  GenericScreen: {
    title: string;
    route: string;
  };
};

const Stack = createNativeStackNavigator<AppStackParamList>();

export default function AppStackScreen() {
  const { activeChat } = useActiveChat();

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
          ),
        }}
      />
      
      <Stack.Screen
        name="GenericScreen"
        component={GenericScreen}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
}
