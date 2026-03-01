import React from 'react';
import { View, Text } from 'react-native';
import TypingIndicator from './TypingIndicator';
import { Message } from '../utils/chatUtils';

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
            backgroundColor: '#F4E6D7',
            borderBottomLeftRadius: 4,
          }}
        >
          <TypingIndicator />
        </View>
      </View>
    );
  }

  const isUser = item.sender === 'user';

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
    </View>
  );
};

export default MessageItem;
