import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Mic, Paperclip, Send } from 'lucide-react-native';

interface ChatInputProps {
  message: string;
  setMessage: (msg: string) => void;
  onSend: () => void;
}

export default function ChatInput({
  message,
  setMessage,
  onSend,
}: ChatInputProps) {
  return (
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
        onSubmitEditing={onSend}
      />
      <TouchableOpacity style={styles.inputIconBtn}>
        <Mic size={22} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.sendBtn} onPress={onSend}>
        <Send size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
