import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { LogOut } from 'lucide-react-native';

export default function LogoutButton() {
  return (
    <TouchableOpacity style={styles.logoutBtn}>
      <LogOut size={20} color="#f44336" />
      <Text style={styles.logoutText}>Log Out</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: 'rgba(244,67,54,0.2)',
    padding: 16,
    margin: 16,
    borderRadius: 12,
  },
  logoutText: { color: '#f44336', fontSize: 16, fontWeight: '600' },
});
