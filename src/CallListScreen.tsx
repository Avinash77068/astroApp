import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { ChevronLeft, Phone, MessageCircle, Search } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');

const astrologers = [
  {
    name: 'Lorem Ipsum',
    status: 'Vedic, Vamtantra',
    language: 'English, Hindi',
    experience: '8 Years',
    price: 22,
    rating: 5.0,
    online: true,
  },
  {
    name: 'Lorem Ipsum',
    status: 'Vedic, Vamtantra',
    language: 'English, Hindi',
    experience: '8 Years',
    price: 22,
    rating: 5.0,
    online: true,
  },
  {
    name: 'Lorem Ipsum',
    status: 'Vedic, Astrology',
    language: 'English, Hindi',
    experience: '5 Years',
    price: 18,
    rating: 4.8,
    online: false,
  },
  {
    name: 'Lorem Ipsum',
    status: 'Numerology',
    language: 'English, Hindi',
    experience: '10 Years',
    price: 30,
    rating: 4.9,
    online: true,
  },
];

export default function CallListScreen({
  onBack,
  onCall,
}: {
  onBack: () => void;
  onCall: () => void;
}) {
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filters = ['All', 'Vedic', 'Love', 'Palmistry'];

  return (
    <LinearGradient colors={['#4a148c', '#6a1b9a']} style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={onBack}>
          <ChevronLeft color="white" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Call</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Search color="white" size={22} />
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterTabs}
      >
        {filters.map(filter => (
          <TouchableOpacity
            key={filter}
            onPress={() => setSelectedFilter(filter)}
            style={[
              styles.filterTab,
              selectedFilter === filter && styles.activeTab,
            ]}
          >
            <Text style={styles.filterText}>{filter}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Astrologers List */}
      <FlatList
        data={astrologers}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={({ item }) => (
          <View style={styles.astrologerCard}>
            {/* Header */}
            <View style={styles.astroHeader}>
              <View style={styles.astroInfo}>
                <View style={styles.avatarWrapper}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarEmoji}>👨‍💼</Text>
                  </View>
                </View>
                {item.online && (
                  <View style={styles.onlineWrapper}>
                    <View style={styles.onlineDot} />
                    <Text style={styles.onlineText}>Online</Text>
                  </View>
                )}
                <View style={{ flex: 1 }}>
                  <View style={{flexDirection:'row',gap:4}}>
                    <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.specialty}>{item.status}</Text>
                  </View>
                  
                  <View style={styles.metaRow}>
                    <Text style={styles.language}>{item.language}</Text>
                    <Text style={styles.metaText}>⭐ {item.rating}</Text>
                    <Text style={styles.metaText}>{item.experience}</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Actions */}
            <View style={styles.actionsRow}>
              <TouchableOpacity style={[styles.actionBtn, styles.chatBtn]}>
                <MessageCircle color="white" size={18} />
                <Text style={styles.actionText}>Contact</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionBtn, styles.callBtn]}
                onPress={onCall}
              >
                <Phone color="white" size={18} />
                <Text style={styles.actionText}>Call</Text>
              </TouchableOpacity>
            </View>

            {/* Price */}
            <View style={styles.priceContainer}>
              <Text style={styles.priceText}>${item.price}/min</Text>
            </View>
          </View>
        )}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    minHeight: height,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  iconButton: {
    padding: 6,
  },
  filterTabs: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 10,
  },
  filterTab: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#7c4dff',
    borderColor: 'transparent',
    shadowColor: '#7c4dff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
  filterText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  astrologerCard: {
    marginHorizontal: 20,
    marginVertical: 8,
    padding: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  astroHeader: {
    marginBottom: 12,
  },
  astroInfo: {
    flexDirection: 'row',
    gap: 12,
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarEmoji: {
    fontSize: 28,
  },
  onlineWrapper: {
    position: 'absolute',
    top: 4,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(76,175,80,0.2)',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: 'rgba(76,175,80,0.3)',
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4caf50',
    marginRight: 4,
    shadowColor: '#4caf50',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  onlineText: {
    color: 'white',
    fontSize: 11,
    fontWeight: '600',
  },
  name: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  specialty: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 13,
  },
  language: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    marginBottom: 4,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 10,
  },
  metaText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginVertical: 12,
  },
  actionBtn: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  chatBtn: {
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  callBtn: {
    backgroundColor: '#4caf50',
  },
  actionText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  priceContainer: {
    backgroundColor: 'rgba(124,77,255,0.15)',
    borderRadius: 8,
    padding: 8,
  },
  priceText: {
    color: '#7c4dff',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 14,
  },
});
