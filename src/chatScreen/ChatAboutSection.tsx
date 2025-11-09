import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ChatAboutSection() {
  return (
    <View style={styles.aboutSection}>
      <Text style={styles.aboutTitle}>About me</Text>
      <Text style={styles.aboutText}>
        Lorem ipsum dolor sit amet consectetur. Ipsum tempus posuere est Amet
        Lorem Ipsum dolor sit amet consectetur.
      </Text>
      <View style={styles.ratingSection}>
        <Text style={styles.ratingTitle}>Rating overview</Text>
        <View style={styles.ratingDisplay}>
          <Text style={styles.ratingScore}>5/</Text>
          <Text style={styles.ratingStars}>⭐⭐⭐⭐⭐</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  ratingDisplay: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  ratingScore: { color: 'white', fontSize: 20, fontWeight: '700' },
  ratingStars: { fontSize: 16, color: 'white' },
});
