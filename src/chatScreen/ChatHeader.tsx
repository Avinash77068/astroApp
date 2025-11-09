import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MoreVertical } from 'lucide-react-native';


export default function ChatHeader() {
  return (
    <View style={styles.chatHeader}>
      
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
  );
}

const styles = StyleSheet.create({
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(74,20,140,0.8)',
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
  userDetails: { flexDirection: 'column' },
  userName: { color: 'white', fontSize: 16, fontWeight: '600' },
  userStatus: { color: '#4caf50', fontSize: 12, fontWeight: '500' },
});
