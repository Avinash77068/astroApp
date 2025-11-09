import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView
} from 'react-native';
import { ChevronLeft, Send, Mic, Paperclip, MoreVertical } from 'lucide-react-native';

interface ChatScreenProps {
  onBack: () => void;
}

interface Message {
  id: number;
  text: string;
  sender: 'me' | 'them';
  time: string;
}

const initialMessages: Message[] = [
  { id: 1, text: 'Hello there!', sender: 'them', time: '10:30 AM' },
  { id: 2, text: 'Lorem ipsum dolor sit amet', sender: 'me', time: '10:32 AM' },
  { id: 3, text: 'Lorem Ipsum dolor sit Amet', sender: 'them', time: '10:35 AM' },
  { id: 4, text: 'Lorem Ipsum dolor sit Amet', sender: 'me', time: '10:36 AM' },
];

const { width, height } = Dimensions.get('window');

const ChatScreen = ({ onBack }: ChatScreenProps) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const handleSend = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: message,
        sender: 'me',
        time: 'Now',
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  // stars placeholder
  const stars = [...Array(10)].map(() => ({
    left: Math.random() * width,
    top: Math.random() * height,
    size: Math.random() * 3 + 1,
  }));

  return (
    <SafeAreaView style={styles.container}>
      <View style={StyleSheet.absoluteFill}>
        {stars.map((star, index) => (
          <View
            key={index}
            style={{
              width: star.size,
              height: star.size,
              backgroundColor: 'white',
              borderRadius: 50,
              position: 'absolute',
              left: star.left,
              top: star.top,
            }}
          />
        ))}
      </View>

      <View style={styles.chatContent}>
        {/* Header */}
        <View style={styles.chatHeader}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <ChevronLeft size={24} color="white" />
          </TouchableOpacity>
          <View style={styles.userInfo}>
            <View style={styles.userAvatar}>
              <Text style={{ fontSize: 20 }}>👤</Text>
            </View>
            <View style={styles.userDetails}>
              <Text style={styles.userName}>Lorem Ipsum</Text>
              <Text style={styles.userStatus}>Active Now</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.iconButton}>
            <MoreVertical size={22} color="white" />
          </TouchableOpacity>
        </View>

        {/* Messages */}
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
          renderItem={({ item }) => (
            <View style={[
              styles.message,
              item.sender === 'me' ? styles.messageSent : styles.messageReceived
            ]}>
              {item.sender === 'them' && <View style={styles.messageAvatar}><Text>👤</Text></View>}
              <View style={styles.messageContent}>
                <View style={[
                  styles.messageBubble,
                  item.sender === 'me' ? styles.bubbleSent : styles.bubbleReceived
                ]}>
                  <Text style={styles.messageText}>{item.text}</Text>
                </View>
                <Text style={styles.messageTime}>{item.time}</Text>
              </View>
            </View>
          )}
        />

        {/* About Section */}
        <View style={styles.aboutSection}>
          <Text style={styles.aboutTitle}>About me</Text>
          <Text style={styles.aboutText}>
            Lorem ipsum dolor sit amet consectetur.
            Ipsum tempus posuere est Amet Lorem Ipsum dolor sit amet consectetur.
          </Text>
          <View style={styles.ratingSection}>
            <Text style={styles.ratingTitle}>Rating overview</Text>
            <View style={styles.ratingDisplay}>
              <Text style={styles.ratingScore}>5/</Text>
              <Text style={styles.ratingStars}>⭐⭐⭐⭐⭐</Text>
            </View>
          </View>
        </View>

        {/* Input */}
        <View style={styles.chatInputContainer}>
          <TouchableOpacity style={styles.inputIconBtn}>
            <Paperclip size={22} color="white" />
          </TouchableOpacity>
          <TextInput
            style={styles.chatInput}
            placeholder="Type message here"
            placeholderTextColor="rgba(255,255,255,0.5)"
            value={message}
            onChangeText={setMessage}
            onSubmitEditing={handleSend}
          />
          <TouchableOpacity style={styles.inputIconBtn}>
            <Mic size={22} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
            <Send size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4a148c',
  },
  chatContent: {
    flex: 1,
    zIndex: 10,
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(74,20,140,0.8)',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginLeft: 12,
  },
  userAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userDetails: {
    flexDirection: 'column',
  },
  userName: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  userStatus: {
    color: '#4caf50',
    fontSize: 12,
    fontWeight: '500',
  },
  message: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 12,
  },
  messageSent: {
    justifyContent: 'flex-end',
  },
  messageReceived: {
    justifyContent: 'flex-start',
  },
  messageAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  messageContent: {
    maxWidth: '70%',
  },
  messageBubble: {
    padding: 12,
    borderRadius: 16,
    marginBottom: 2,
  },
  bubbleSent: {
    backgroundColor: 'linear-gradient(135deg, #7c4dff, #9c27b0)',
    borderTopRightRadius: 4,
  },
  bubbleReceived: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    borderTopLeftRadius: 4,
  },
  messageText: {
    color: 'white',
    fontSize: 14,
  },
  messageTime: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 11,
    paddingHorizontal: 4,
  },
  aboutSection: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 16,
  },
  aboutTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  aboutText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 12,
  },
  ratingSection: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
    paddingTop: 8,
  },
  ratingTitle: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  ratingDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ratingScore: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
  },
  ratingStars: {
    fontSize: 16,
    color: 'white',
  },
  chatInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: 'rgba(74,20,140,0.8)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  inputIconBtn: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  chatInput: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderColor: 'rgba(255,255,255,0.2)',
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    color: 'white',
    fontSize: 14,
    marginRight: 8,
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#7c4dff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
