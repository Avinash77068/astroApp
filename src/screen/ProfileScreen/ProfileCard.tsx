import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Settings } from 'lucide-react-native';

export default function ProfileCard() {
  return (
    <View style={styles.profileCard}>
      <View style={styles.avatarSection}>
        <View style={styles.avatarPlaceholder}>
          <Text style={{ fontSize: 40 }}>👤</Text>
        </View>
        <TouchableOpacity style={styles.editAvatarBtn}>
          <Settings size={16} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.profileInfo}>
        <Text style={styles.profileName}>Loreum</Text>
        <Text style={styles.profileEmail}>Loreum@Ipsum.com</Text>
      </View>

      <View style={styles.stats}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>0</Text>
          <Text style={styles.statLabel}>Consultations</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statBox}>
          <Text style={styles.statValue}>0</Text>
          <Text style={styles.statLabel}>Minutes</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileCard: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    margin: 16,
    borderRadius: 20,
    padding: 20,
  },
  avatarSection: { alignItems: 'center', marginBottom: 16 },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editAvatarBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#7c4dff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfo: { alignItems: 'center', marginBottom: 16 },
  profileName: { color: '#fff', fontSize: 22, fontWeight: '600' },
  profileEmail: { color: 'rgba(255,255,255,0.7)', fontSize: 14 },
  stats: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 32,
  },
  statBox: { alignItems: 'center' },
  statValue: { color: '#fff', fontSize: 20, fontWeight: '700' },
  statLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 12 },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
});
