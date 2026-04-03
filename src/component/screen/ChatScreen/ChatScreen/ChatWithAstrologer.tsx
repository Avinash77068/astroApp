import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { useActiveChat } from '../../../../store/useActiveChat';
import { AppStackParamList } from '../../../../app/navigation/AppStackScreen';
import MessageItem from './components/MessageItem';
import {
  Message,
  createUserMessage,
  createAstroMessage,
  createTypingMessage,
  createErrorMessage,
  createInitialMessage,
  sendChatMessage,
} from './utils/chatUtils';
import { useAuthStore } from '../../../../store/authStore';

const ChatWithAstrologer = () => {
  const route = useRoute<RouteProp<AppStackParamList, 'ChatWithAstrologer'>>();
  const astrologer = route.params?.astrologer;
  const chatHistory = route.params?.chatHistory || [];
  const { user } = useAuthStore();

  
  const { setActiveChat } = useActiveChat();
  useEffect(() => {
    if (astrologer) {
      setActiveChat(astrologer);
    }
  }, [astrologer, setActiveChat]);

  // Convert chat history to Message format
  const convertChatHistoryToMessages = (history: any[]): Message[] => {
    console.log('Converting chat history, length:', history.length);
    const messages: Message[] = [];
    
    history.forEach((chat, index) => {
      console.log(`Chat ${index}:`, chat);
      
      // Add user message
      messages.push({
        id: chat._id + '_user',
        text: chat.message,
        sender: 'user',
        timestamp: chat.timestamp,
      });
      
      // Add astrologer response
      if (chat.astroResponse) {
        messages.push({
          id: chat._id + '_astro',
          text: chat.astroResponse,
          sender: 'astrologer',
          timestamp: chat.timestamp,
        });
      }
    });
    
    console.log('Converted messages:', messages);
    return messages;
  };

  const [messages, setMessages] = useState<Message[]>(() => {
    const historyMessages = convertChatHistoryToMessages(chatHistory);
    console.log('Initial messages state:', historyMessages);
    return historyMessages.length > 0 
      ? historyMessages 
      : [createInitialMessage(astrologer?.name)];
  });

  const [input, setInput] = useState('');
  const flatListRef = useRef<FlatList>(null);

  const sendMessage = async () => {
    if (!input.trim() || !user) return;

    const newMessage = createUserMessage(input);
    const typingMessage = createTypingMessage();

    setMessages(prev => [...prev, newMessage, typingMessage]);
    setInput('');

    try {
      const userChatResponse = await sendChatMessage(
        newMessage.text,
        astrologer._id,
        user.id,
      );
      const data = userChatResponse;
      const astroMessage = createAstroMessage(
        data.data.astroResponse || 'Sorry, I could not understand.',
      );
      setMessages(prev => {
        const filtered = prev.filter(m => m.id !== 'typing');
        return [...filtered, astroMessage];
      });
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = createErrorMessage();
      setMessages(prev => {
        const filtered = prev.filter(m => m.id !== 'typing');
        return [...filtered, errorMessage];
      });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);

  const renderItem = ({ item }: { item: Message }) => (
    <MessageItem item={item} />
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.chatArea}
        onContentSizeChange={() => {
          flatListRef.current?.scrollToEnd({ animated: true });
        }}
        onLayout={() => {
          flatListRef.current?.scrollToEnd({ animated: false });
        }}
      />

      {/* Input Section */}
      <View style={styles.inputContainer}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Type your message..."
          style={styles.input}
        />

        <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatWithAstrologer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F2',
  },

  chatArea: {
    padding: 16,
    paddingBottom: 10,
  },

  messageContainer: {
    marginBottom: 12,
    maxWidth: '75%',
  },

  userAlign: {
    alignSelf: 'flex-end',
  },

  astroAlign: {
    alignSelf: 'flex-start',
  },

  bubble: {
    padding: 12,
    borderRadius: 18,
  },

  userBubble: {
    backgroundColor: '#FF7A18',
    borderBottomRightRadius: 4,
  },

  astroBubble: {
    backgroundColor: '#F4E6D7',
    borderBottomLeftRadius: 4,
  },

  messageText: {
    fontSize: 14,
  },

  userText: {
    color: '#fff',
  },

  astroText: {
    color: '#2C2C2C',
  },

  inputContainer: {
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#eee',
  },

  input: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 14,
    marginRight: 8,
  },

  sendBtn: {
    backgroundColor: '#FF7A18',
    paddingHorizontal: 16,
    justifyContent: 'center',
    borderRadius: 20,
  },

  sendText: {
    color: '#fff',
    fontWeight: '600',
  },
});
