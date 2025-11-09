import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Animated,
  Dimensions
} from 'react-native';
import { ChevronLeft, Search } from 'lucide-react-native';

interface ChatListScreenProps {
  onBack: () => void;
  onSelectChat: () => void;
}

const chats = [
  { name: 'Lorem Ipsum', lastMessage: 'Vedic, constellation, Vedic Astrology', time: '8 Hours', online: true },
  { name: 'Lorem Ipsum', lastMessage: 'Vedic, constellation, Vedic Astrology', time: '8 Hours', online: true },
  { name: 'Lorem Ipsum', lastMessage: 'Vedic, constellation, Vedic Astrology', time: '8 Hours', online: false },
  { name: 'Lorem Ipsum', lastMessage: 'Vedic, constellation, Vedic Astrology', time: '8 Hours', online: true },
  { name: 'Lorem Ipsum', lastMessage: 'Vedic, constellation, Vedic Astrology', time: '8 Hours', online: false },
];

const { width, height } = Dimensions.get('window');

const ChatListScreen = ({ onBack, onSelectChat }: ChatListScreenProps) => {

  // Star animation
  const stars = [...Array(15)].map(() => ({
    left: Math.random() * width,
    top: Math.random() * height,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 3000
  }));

  return (
    <SafeAreaView style={styles.container}>
      <View style={StyleSheet.absoluteFill}>
        {stars.map((star, index) => (
          <Animated.View
            key={index}
            style={[
              styles.star,
              {
                width: star.size,
                height: star.size,
                top: star.top,
                left: star.left,
                opacity: new Animated.Value(0.3),
              }
            ]}
          />
        ))}
      </View>

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <ChevronLeft size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chat</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Search size={22} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.filterTabs}>
        {['All', 'Vedic', 'Love', 'Palmistry'].map((tab) => (
          <TouchableOpacity key={tab} style={[styles.filterTab, tab === 'All' && styles.filterTabActive]}>
            <Text style={styles.filterTabText}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={chats}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.chatItem} onPress={onSelectChat}>
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
              <Text style={styles.chatLastMessage} numberOfLines={1}>{item.lastMessage}</Text>
            </View>

            {item.online && <View style={styles.onlineTag}><Text style={styles.onlineTagText}>Online</Text></View>}
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default ChatListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4a148c',
  },
  star: {
    position: 'absolute',
    borderRadius: 50,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
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
  headerTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: '600',
  },
  filterTabs: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 12,
    gap: 10,
  },
  filterTab: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  filterTabActive: {
    backgroundColor: 'rgba(124,77,255,0.8)',
  },
  filterTabText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 13,
  },
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
  avatarWrapper: {
    position: 'relative',
  },
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
  chatDetails: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  chatName: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  chatTime: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 12,
  },
  chatLastMessage: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 14,
  },
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
