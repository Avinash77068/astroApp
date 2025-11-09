import React, { useState } from 'react';
import { SafeAreaView, FlatList, StyleSheet } from 'react-native';
import StarBackground from './StarBackground';
import FilterTabs from './FilterTabs';
import ChatItem from './ChatItem';

interface ChatListScreenProps {
  onBack: () => void;
  onSelectChat: () => void;
}

const chats = [
  {
    name: 'Lorem Ipsum',
    lastMessage: 'Vedic, constellation, Vedic Astrology',
    time: '8 Hours',
    online: true,
  },
  {
    name: 'Lorem Ipsum',
    lastMessage: 'Vedic, constellation, Vedic Astrology',
    time: '8 Hours',
    online: true,
  },
  {
    name: 'Lorem Ipsum',
    lastMessage: 'Vedic, constellation, Vedic Astrology',
    time: '8 Hours',
    online: false,
  },
  {
    name: 'Lorem Ipsum',
    lastMessage: 'Vedic, constellation, Vedic Astrology',
    time: '8 Hours',
    online: true,
  },
  {
    name: 'Lorem Ipsum',
    lastMessage: 'Vedic, constellation, Vedic Astrology',
    time: '8 Hours',
    online: false,
  },
];

export default function ChatListScreen({ onSelectChat }: ChatListScreenProps) {
  const [selectedTab, setSelectedTab] = useState('All');

  return (
    <SafeAreaView style={styles.container}>
      <StarBackground />
      <FilterTabs selected={selectedTab} onSelect={setSelectedTab} />

      <FlatList
        data={chats}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
        renderItem={({ item }) => (
          <ChatItem item={item} onPress={onSelectChat} />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#4a148c',paddingTop:140 },
});
