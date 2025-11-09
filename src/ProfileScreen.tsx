import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { ChevronLeft, Settings, CreditCard, HelpCircle, LogOut, ChevronRight } from 'lucide-react-native';

const menuItems = [
  { icon: Settings, label: 'Settings', color: '#7c4dff' },
  { icon: CreditCard, label: 'Customer Care', color: '#4caf50' },
  { icon: HelpCircle, label: 'Feedback', color: '#ff9800' },
  { icon: LogOut, label: 'Report', color: '#f44336' },
];

interface ProfileScreenProps {
  onBack: () => void;
}

const ProfileScreen = ({ onBack }: ProfileScreenProps) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <ChevronLeft size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={{ width: 40 }} />
      </View>

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

      <View style={styles.walletCard}>
        <View style={styles.walletHeader}>
          <Text style={styles.walletTitle}>My Wallet</Text>
          <TouchableOpacity style={styles.walletAction}>
            <Text style={{ color: '#fff' }}>Add Money</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.walletBalance}>
          <Text style={styles.balanceLabel}>Balance</Text>
          <Text style={styles.balanceAmount}>$0.00</Text>
        </View>
      </View>

      <View style={styles.menuSection}>
        {menuItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem}>
            <View style={[styles.menuItemIcon, { backgroundColor: `${item.color}20` }]}>
              <item.icon size={22} color={item.color} />
            </View>
            <Text style={styles.menuItemLabel}>{item.label}</Text>
            <ChevronRight size={20} color="#fff" />
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.logoutBtn}>
        <LogOut size={20} color="#f44336" />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#4a148c',paddingTop:40 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20 },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: '600' },
  profileCard: { backgroundColor: 'rgba(255,255,255,0.08)', margin: 16, borderRadius: 20, padding: 20 },
  avatarSection: { alignItems: 'center', marginBottom: 16 },
  avatarPlaceholder: { width: 100, height: 100, borderRadius: 50, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center' },
  editAvatarBtn: { position: 'absolute', bottom: 0, right: 0, width: 32, height: 32, borderRadius: 16, backgroundColor: '#7c4dff', alignItems: 'center', justifyContent: 'center' },
  profileInfo: { alignItems: 'center', marginBottom: 16 },
  profileName: { color: '#fff', fontSize: 22, fontWeight: '600' },
  profileEmail: { color: 'rgba(255,255,255,0.7)', fontSize: 14 },
  stats: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 32 },
  statBox: { alignItems: 'center' },
  statValue: { color: '#fff', fontSize: 20, fontWeight: '700' },
  statLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 12 },
  statDivider: { width: 1, height: 40, backgroundColor: 'rgba(255,255,255,0.2)', marginHorizontal: 16 },
  walletCard: { backgroundColor: 'rgba(255,255,255,0.08)', margin: 16, borderRadius: 16, padding: 16 },
  walletHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  walletTitle: { color: '#fff', fontSize: 16, fontWeight: '600' },
  walletAction: { backgroundColor: '#7c4dff', padding: 8, borderRadius: 8 },
  walletBalance: { flexDirection: 'row', justifyContent: 'space-between', padding: 12, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 12 },
  balanceLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 12 },
  balanceAmount: { color: '#fff', fontSize: 18, fontWeight: '700' },
  menuSection: { margin: 16 },
  menuItem: { flexDirection: 'row', alignItems: 'center', padding: 12, marginBottom: 12, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.08)' },
  menuItemIcon: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  menuItemLabel: { flex: 1, color: '#fff', fontSize: 14 },
  logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: 'rgba(244,67,54,0.2)', padding: 16, margin: 16, borderRadius: 12 },
  logoutText: { color: '#f44336', fontSize: 16, fontWeight: '600' },
});

export default ProfileScreen;
