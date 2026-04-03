import React from 'react';
import { View, Text } from 'react-native';
import TypingIndicator from './TypingIndicator';
import { Message } from '../utils/chatUtils';
import { LightColors } from '../../../../../constant/colors';

interface MessageItemProps {
  item: Message;
}

const MessageItem: React.FC<MessageItemProps> = ({ item }) => {
  if (item.sender === 'typing') {
    return (
      <View style={{ marginBottom: 12, maxWidth: '75%', alignSelf: 'flex-start' }}>
        <View
          style={{
            padding: 12,
            borderRadius: 18,
            backgroundColor: LightColors.background,
            borderBottomLeftRadius: 4,
          }}
        >
          <TypingIndicator />
        </View>
      </View>
    );
  }

  const isUser = item.sender === 'user';

  const formatTime = (timestamp?: string) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  return (
    <View
      style={{
        marginBottom: 12,
        maxWidth: '75%',
        alignSelf: isUser ? 'flex-end' : 'flex-start',
      }}
    >
      <View
        style={{
          padding: 12,
          borderRadius: 18,
          backgroundColor: isUser ? '#FF7A18' : '#F4E6D7',
          ...(isUser
            ? { borderBottomRightRadius: 4 }
            : { borderBottomLeftRadius: 4 }),
        }}
      >
        <Text
          style={{
            fontSize: 14,
            color: isUser ? '#fff' : '#2C2C2C',
          }}
        >
          {item.text}
        </Text>
      </View>
      {item.timestamp && (
        <Text
          style={{
            fontSize: 10,
            color: '#999',
            marginTop: 4,
            alignSelf: isUser ? 'flex-end' : 'flex-start',
          }}
        >
          {formatTime(item.timestamp)}
        </Text>
      )}
    </View>
  );
};

export default MessageItem;
