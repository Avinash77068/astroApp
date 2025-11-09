import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ChevronLeft, Heart, Share2, ThumbsUp } from 'lucide-react-native';

interface LiveScreenProps {
  onBack: () => void;
}

const liveStreams = [
  { name: 'LEO', viewers: 123, thumbnail: '🎭' },
  { name: 'LEO', viewers: 234, thumbnail: '🌟' },
  { name: 'LEO', viewers: 345, thumbnail: '🔮' },
];

const { width } = Dimensions.get('window');

const LiveScreen = ({ onBack }: LiveScreenProps) => {
  const starsAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(starsAnim, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  return (
    <LinearGradient colors={['#4a148c', '#6a1b9a']} style={styles.container}>
      {/* Stars */}
      <View style={StyleSheet.absoluteFill}>
        {[...Array(20)].map((_, i) => {
          const top = Math.random() * 100;
          const left = Math.random() * 100;
          const size = Math.random() * 3 + 1;
          return (
            <Animated.View
              key={i}
              style={[
                styles.star,
                {
                  width: size,
                  height: size,
                  top: `${top}%`,
                  left: `${left}%`,
                  opacity: starsAnim.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: [0.3, 1, 0.3],
                  }),
                },
              ]}
            />
          );
        })}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <ChevronLeft size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Live</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Filter Tabs */}
        <View style={styles.filterTabs}>
          {['All', 'Vedic', 'Love', 'Marriage'].map((tab, i) => (
            <TouchableOpacity key={i} style={[styles.filterTab, i === 0 && styles.activeTab]}>
              <Text style={styles.filterTabText}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Live Streams */}
        <View style={styles.streamGrid}>
          {liveStreams.map((stream, i) => (
            <View key={i} style={styles.streamCard}>
              <LinearGradient
                colors={['rgba(124,77,255,0.3)', 'rgba(156,39,176,0.3)']}
                style={styles.streamThumbnail}
              >
                <View style={styles.liveBadgeTop}>
                  <Text style={styles.liveBadgeText}>LIVE</Text>
                </View>
                <Text style={styles.streamEmoji}>{stream.thumbnail}</Text>
                <View style={styles.streamOverlay}>
                  <Text style={styles.streamViewers}>👁 {stream.viewers}</Text>
                </View>
              </LinearGradient>
              <View style={styles.streamDetails}>
                <Text style={styles.streamName}>{stream.name}</Text>
                <Text style={styles.streamDescription}>
                  Lorem ipsum dolor sit amet consectetur. Ipsum tempus posuere est.
                </Text>
                <View style={styles.streamMeta}>
                  <Text style={styles.streamMetaText}>👁 {stream.viewers}</Text>
                  <Text style={styles.streamMetaText}>English</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Featured Live */}
        <View style={styles.featuredLive}>
          <LinearGradient
            colors={['rgba(74,20,140,0.8)', 'rgba(106,27,154,0.8)']}
            style={styles.featuredVideo}
          >
            <View style={styles.liveBadgeVideo}>
              <Text style={styles.liveBadgeText}>LIVE</Text>
            </View>
            <View style={styles.videoPlaceholder}>
              <Text style={styles.videoAvatar}>👨‍💼</Text>
            </View>

            {/* Interactions */}
            <View style={styles.videoInteractions}>
              <TouchableOpacity style={styles.interactionBtn}>
                <Heart size={24} color="white" />
                <Text style={styles.interactionText}>123</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.interactionBtn}>
                <ThumbsUp size={24} color="white" />
                <Text style={styles.interactionText}>456</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.interactionBtn}>
                <Share2 size={24} color="white" />
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default LiveScreen;

const styles = StyleSheet.create({
  container: { flex: 1,paddingTop:60 },
  scrollContent: { paddingBottom: 20 },
  star: {
    position: 'absolute',
    borderRadius: 50,
    backgroundColor: 'white',
  },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20 },
  backButton: { width: 40, height: 40, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center' },
  headerTitle: { color: 'white', fontSize: 20, fontWeight: '700' },
  filterTabs: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 16 },
  filterTab: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.1)' },
  activeTab: { backgroundColor: 'rgba(255,255,255,0.2)' },
  filterTabText: { color: 'white', fontWeight: '600' },
  streamGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 12 },
  streamCard: { width: (width - 48) / 2, marginBottom: 16, borderRadius: 16, overflow: 'hidden', backgroundColor: 'rgba(255,255,255,0.08)' },
  streamThumbnail: { height: 140, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  liveBadgeTop: { position: 'absolute', top: 8, left: 8, paddingHorizontal: 8, paddingVertical: 2, backgroundColor: '#ff4444', borderRadius: 4 },
  liveBadgeText: { color: 'white', fontSize: 10, fontWeight: '700' },
  streamEmoji: { fontSize: 40 },
  streamOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 8, backgroundColor: 'rgba(0,0,0,0.4)' },
  streamViewers: { color: 'white', fontSize: 12, fontWeight: '600' },
  streamDetails: { padding: 8 },
  streamName: { color: 'white', fontSize: 16, fontWeight: '600' },
  streamDescription: { color: 'rgba(255,255,255,0.7)', fontSize: 12 },
  streamMeta: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 },
  streamMetaText: { color: 'rgba(255,255,255,0.6)', fontSize: 11 },
  featuredLive: { paddingHorizontal: 12, marginTop: 24 },
  featuredVideo: { height: 420, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  liveBadgeVideo: { position: 'absolute', top: 16, left: 16, paddingHorizontal: 10, paddingVertical: 4, backgroundColor: '#ff4444', borderRadius: 6 },
  videoPlaceholder: { alignItems: 'center', justifyContent: 'center' },
  videoAvatar: { fontSize: 120 },
  videoInteractions: { position: 'absolute', right: 16, top: '50%', transform: [{ translateY: -50 }], flexDirection: 'column', gap: 16 },
  interactionBtn: { backgroundColor: 'rgba(0,0,0,0.5)', width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  interactionText: { color: 'white', fontSize: 10, fontWeight: '600' },
});
