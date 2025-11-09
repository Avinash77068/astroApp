import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

interface Message {
  id: number;
  text: string;
  sender: 'me' | 'them';
  time: string;
}

interface ChatMessageListProps {
  messages: Message[];
}

export default function ChatMessageList({ messages }: ChatMessageListProps) {
  return (
    <FlatList
      data={messages}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
      renderItem={({ item }) => (
        <View
          style={[
            styles.message,
            item.sender === 'me' ? styles.messageSent : styles.messageReceived,
          ]}
        >
          {item.sender === 'them' && (
            <View style={styles.messageAvatar}>
              <Text>👤</Text>
            </View>
          )}
          <View style={styles.messageContent}>
            <View
              style={[
                styles.messageBubble,
                item.sender === 'me'
                  ? styles.bubbleSent
                  : styles.bubbleReceived,
              ]}
            >
              <Text style={styles.messageText}>{item.text}</Text>
            </View>
            <Text style={styles.messageTime}>{item.time}</Text>
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  message: { flexDirection: 'row', alignItems: 'flex-end', marginBottom: 12 },
  messageSent: { justifyContent: 'flex-end' },
  messageReceived: { justifyContent: 'flex-start' },
  messageAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  messageContent: { maxWidth: '70%' },
  messageBubble: { padding: 12, borderRadius: 16, marginBottom: 2 },
  bubbleSent: { backgroundColor: '#7c4dff', borderTopRightRadius: 4 },
  bubbleReceived: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    borderTopLeftRadius: 4,
  },
  messageText: { color: 'white', fontSize: 14 },
  messageTime: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 11,
    paddingHorizontal: 4,
  },
});
