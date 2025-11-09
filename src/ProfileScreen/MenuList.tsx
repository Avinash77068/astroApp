import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import {
  Settings,
  CreditCard,
  HelpCircle,
  LogOut,
  ChevronRight,
} from 'lucide-react-native';

const menuItems = [
  { icon: Settings, label: 'Settings', color: '#7c4dff' },
  { icon: CreditCard, label: 'Customer Care', color: '#4caf50' },
  { icon: HelpCircle, label: 'Feedback', color: '#ff9800' },
  { icon: LogOut, label: 'Report', color: '#f44336' },
];

export default function MenuList() {
  return (
    <View style={styles.menuSection}>
      {menuItems.map((item, index) => (
        <TouchableOpacity key={index} style={styles.menuItem}>
          <View
            style={[
              styles.menuItemIcon,
              { backgroundColor: `${item.color}20` },
            ]}
          >
            <item.icon size={22} color={item.color} />
          </View>
          <Text style={styles.menuItemLabel}>{item.label}</Text>
          <ChevronRight size={20} color="#fff" />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  menuSection: { margin: 16 },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  menuItemIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuItemLabel: { flex: 1, color: '#fff', fontSize: 14 },
});
