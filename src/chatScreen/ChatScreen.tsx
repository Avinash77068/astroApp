import React, { useState } from 'react';
import { SafeAreaView, View, Dimensions, StyleSheet } from 'react-native';
import ChatHeader from './ChatHeader';
import ChatMessageList from './ChatMessageList';
import ChatAboutSection from './ChatAboutSection';
import ChatInput from './ChatInput';

const { width, height } = Dimensions.get('window');
interface Message {
  id: number;
  text: string;
  sender: 'me' | 'them';
  time: string;
}

const initialMessages: Message[] = [
  { id: 1, text: 'Hello there!', sender: 'them', time: '10:30 AM' },
  { id: 2, text: 'Lorem ipsum dolor sit amet', sender: 'me', time: '10:32 AM' },
  {
    id: 3,
    text: 'Lorem Ipsum dolor sit Amet',
    sender: 'them',
    time: '10:35 AM',
  },
  { id: 4, text: 'Lorem Ipsum dolor sit Amet', sender: 'me', time: '10:36 AM' },
];

export default function ChatScreen({ onBack }: { onBack: () => void }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(initialMessages);

  const handleSend = () => {
    if (message.trim()) {
      setMessages([
        ...messages,
        { id: messages.length + 1, text: message, sender: 'me', time: 'Now' },
      ]);
      setMessage('');
    }
  };

  const stars = [...Array(10)].map(() => ({
    left: Math.random() * width,
    top: Math.random() * height,
    size: Math.random() * 3 + 1,
  }));

  return (
    <SafeAreaView style={styles.container}>
      <View style={StyleSheet.absoluteFill}>
        {stars.map((s, i) => (
          <View
            key={i}
            style={{
              width: s.size,
              height: s.size,
              backgroundColor: 'white',
              borderRadius: 50,
              position: 'absolute',
              left: s.left,
              top: s.top,
            }}
          />
        ))}
      </View>
      <View style={styles.chatContainer}>
        <ChatHeader />
        <ChatMessageList messages={messages}/>
        <ChatAboutSection />
        <ChatInput
          message={message}
          setMessage={setMessage}
          onSend={handleSend}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#4a148c' },
  chatContainer: { flex: 1 ,marginVertical: "20%"},
});
