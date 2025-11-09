import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface ChatItemProps {
  item: any;
  onPress: () => void;
}

export default function ChatItem({ item, onPress }: ChatItemProps) {
  return (
    <TouchableOpacity style={styles.chatItem} onPress={onPress}>
      <View style={styles.avatarWrapper}>
        <View style={styles.avatar}>
          <Text style={{ fontSize: 24 }}>👤</Text>
        </View>
        {item.online && <View style={styles.onlineIndicator} />}
      </View>

      <View style={styles.chatDetails}>
        <View style={styles.chatHeader}>
          <Text style={styles.chatName}>{item.name}</Text>
          <Text style={styles.chatTime}>{item.time}</Text>
        </View>
        <Text style={styles.chatLastMessage} numberOfLines={1}>
          {item.lastMessage}
        </Text>
      </View>

      {item.online && (
        <View style={styles.onlineTag}>
          <Text style={styles.onlineTagText}>Online</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    backgroundColor: 'rgba(255,255,255,0.05)',
    marginBottom: 8,
    borderRadius: 12,
    position: 'relative',
  },
  avatarWrapper: { position: 'relative' },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  onlineIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4caf50',
    borderWidth: 1,
    borderColor: 'rgba(76,175,80,0.3)',
    position: 'absolute',
    right: -2,
    top: -2,
  },
  chatDetails: { flex: 1 },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  chatName: { color: 'white', fontSize: 16, fontWeight: '600' },
  chatTime: { color: 'rgba(255,255,255,0.5)', fontSize: 12 },
  chatLastMessage: { color: 'rgba(255,255,255,0.6)', fontSize: 14 },
  onlineTag: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(76,175,80,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(76,175,80,0.3)',
  },
  onlineTagText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#4caf50',
  },
});
