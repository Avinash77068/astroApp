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
import { ChevronLeft } from 'lucide-react-native';

interface ZodiacDetailScreenProps {
  zodiac: string;
  onBack: () => void;
}

const zodiacInfo: Record<string, { icon: string; period: string; element: string }> = {
  Leo: { icon: '♌', period: 'Jul 23 - Aug 22', element: 'Fire' },
  Aries: { icon: '♈', period: 'Mar 21 - Apr 19', element: 'Fire' },
  Taurus: { icon: '♉', period: 'Apr 20 - May 20', element: 'Earth' },
  Gemini: { icon: '♊', period: 'May 21 - Jun 20', element: 'Air' },
  Cancer: { icon: '♋', period: 'Jun 21 - Jul 22', element: 'Water' },
  Virgo: { icon: '♍', period: 'Aug 23 - Sep 22', element: 'Earth' },
  Libra: { icon: '♎', period: 'Sep 23 - Oct 22', element: 'Air' },
  Scorpio: { icon: '♏', period: 'Oct 23 - Nov 21', element: 'Water' },
};

const { width } = Dimensions.get('window');

const ZodiacDetailScreen = ({ zodiac, onBack }: ZodiacDetailScreenProps) => {
  const info = zodiacInfo[zodiac] || zodiacInfo.Leo;

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
        {/* Zodiac Hero */}
        <View style={styles.hero}>
          <Animated.Text style={[styles.zodiacIcon, { transform: [{ translateY: starsAnim.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0, -15, 0] }) }] }]}>
            {info.icon}
          </Animated.Text>
        </View>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <Text style={styles.zodiacName}>{zodiac}</Text>
          <Text style={styles.zodiacPeriod}>{info.period}</Text>

          <View style={styles.statsRow}>
            {[
              { label: 'Element', value: info.element },
              { label: 'Quality', value: 'Fixed' },
              { label: 'Ruling Planet', value: 'Sun' },
            ].map((stat) => (
              <View key={stat.label} style={styles.statItem}>
                <Text style={styles.statLabel}>{stat.label}</Text>
                <Text style={styles.statValue}>{stat.value}</Text>
              </View>
            ))}
          </View>

          <View style={styles.descriptionSection}>
            <Text style={styles.descriptionTitle}>About {zodiac}</Text>
            <Text style={styles.descriptionText}>
              The {zodiac.toLowerCase()} sign is known for being bold, ambitious, and confident.
              This passionate fire sign is driven to succeed and thrives when surrounded by others.
              The {zodiac.toLowerCase()} personality is loving, powerful, and generous at their core.
            </Text>
          </View>

          <View style={styles.compatibilitySection}>
            <Text style={styles.sectionSubtitle}>Compatibility</Text>
            {['Aries', 'Gemini', 'Libra', 'Sagittarius'].map((sign) => (
              <View key={sign} style={styles.compatibilityItem}>
                <Text style={styles.compatibilitySign}>{zodiacInfo[sign]?.icon || '♈'}</Text>
                <Text style={styles.compatibilityName}>{sign}</Text>
                <View style={styles.compatibilityBar}>
                  <View style={[styles.compatibilityFill, { width: `${Math.floor(Math.random() * 40 + 60)}%` }]} />
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default ZodiacDetailScreen;

const styles = StyleSheet.create({
  container: { flex: 1,paddingTop:120 },
  scrollContent: { paddingBottom: 40 },
  star: { position: 'absolute', borderRadius: 50, backgroundColor: 'white' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20 },
  backButton: { width: 40, height: 40, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center' },
  headerTitle: { color: 'white', fontSize: 20, fontWeight: '700' },
  hero: { alignItems: 'center', marginBottom: 40 },
  zodiacIcon: { fontSize: 80, color: 'white', marginBottom: 20 },
  infoCard: { backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 24, padding: 24 },
  zodiacName: { color: 'white', fontSize: 22, fontWeight: '600', textAlign: 'center', marginBottom: 8 },
  zodiacPeriod: { color: 'rgba(255,255,255,0.7)', fontSize: 16, textAlign: 'center', marginBottom: 32 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 32 },
  statItem: { alignItems: 'center', flex: 1, marginHorizontal: 4, padding: 12, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 12 },
  statLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 12, marginBottom: 8, textTransform: 'uppercase' },
  statValue: { color: 'white', fontSize: 15, fontWeight: '600' },
  descriptionSection: { marginBottom: 32 },
  descriptionTitle: { color: 'white', fontSize: 20, fontWeight: '600', marginBottom: 16 },
  descriptionText: { color: 'rgba(255,255,255,0.8)', fontSize: 15, lineHeight: 22 },
  compatibilitySection: { marginBottom: 32 },
  sectionSubtitle: { color: 'white', fontSize: 20, fontWeight: '600', marginBottom: 16 },
  compatibilityItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  compatibilitySign: { fontSize: 28, width: 40, textAlign: 'center' },
  compatibilityName: { color: 'white', fontSize: 14, fontWeight: '500', width: 80 },
  compatibilityBar: { flex: 1, height: 8, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 4, overflow: 'hidden' },
  compatibilityFill: { height: '100%', backgroundColor: '#4caf50', borderRadius: 4 },
});
