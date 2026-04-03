import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { activeUser, Props } from './types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../../../app/navigation/AppStackScreen';
import { AstroLogerListStyles } from './LiveAstroLogerListCss';
import { getChatHistory } from '../../../../app/services';
import { useAuthStore } from '../../../../store/authStore';

const LiveAstroLogerList: React.FC<Props> = ({ data }) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const { user } = useAuthStore();

  const handleAstrologerPress = async (astrologer: activeUser) => {
    try {
      // Call chat history API
      const chatHistoryResponse = await getChatHistory('/user/chat-history', {
        userId: user?.id || '65f1a2b3c4d5e6f7g8h9i0j1',
        astrologerId: astrologer._id
      });
      
      console.log('Chat history API response:', chatHistoryResponse);
      console.log('Chat history data:', chatHistoryResponse?.data?.chatHistory);
      
      // Navigate to chat screen with chat history
      navigation.navigate('ChatWithAstrologer', { 
        astrologer,
        chatHistory: chatHistoryResponse?.data?.chatHistory || []
      });
    } catch (error) {
      console.error('Error fetching chat history:', error);
      // Still navigate even if API fails
      navigation.navigate('ChatWithAstrologer', { 
        astrologer,
        chatHistory: []
      });
    }
  };

  const renderItem = ({ item }: { item: activeUser }) => (
    <TouchableOpacity
      style={AstroLogerListStyles.itemContainer}
      onPress={() => handleAstrologerPress(item)}
    >
      <View style={AstroLogerListStyles.avatarWrapper}>
        <View style={AstroLogerListStyles.gradientBorder}>
          <Image
            source={{ uri: item.image }}
            style={AstroLogerListStyles.avatar}
          />
        </View>

        {item.isLive && (
          <View style={AstroLogerListStyles.liveBadge}>
            <View style={AstroLogerListStyles.dot} />
            <Text style={AstroLogerListStyles.liveText}>Live</Text>
          </View>
        )}
      </View>

      <Text numberOfLines={1} style={AstroLogerListStyles.name}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={data}
      keyExtractor={(item, index) => '1' + index}
      renderItem={renderItem}
      contentContainerStyle={AstroLogerListStyles.container}
      style={{ flexGrow: 0 }}
    />
  );
};

export default LiveAstroLogerList;

