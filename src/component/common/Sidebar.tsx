import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import useSidebar from '../../store/useSidebar';
import { DarkColors } from '../../constant/colors';

const Sidebar = () => {
  const { closeSidebar } = useSidebar();

  return (
    <>
      {/* Overlay (Outside Click) */}
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={closeSidebar}
      />

      {/* Sidebar Panel */}
      <View style={styles.sidebar}>
        <Text style={styles.sidebarItem}>🏠 Home</Text>
        <Text style={styles.sidebarItem}>🪐 Kundli</Text>
        <Text style={styles.sidebarItem}>💬 Chat</Text>
        <Text style={styles.sidebarItem}>👤 Profile</Text>
      </View>
    </>
  );
};

export default Sidebar;
const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: DarkColors.overlay,
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 250,
    backgroundColor: 'white',
    padding: 24,
    zIndex: 2,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  sidebarItem: {
    fontSize: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: DarkColors.border,
  },
});