import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, StyleProp, ViewStyle } from 'react-native';
import { ChevronLeft, Search, Bell, Settings } from 'lucide-react-native';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  showSearch?: boolean;
  showBell?: boolean;
  showSettings?: boolean;
  onSearch?: () => void;
  onBell?: () => void;
  onSettings?: () => void;
  backgroundColor?: string;
  style?: StyleProp<ViewStyle>;
  screen?: string;
  iconstyle?: StyleProp<ViewStyle>;
}

export default function ArrowIcons({
  title = '',
  showBack = false,
  onBack,
  showSearch = false,
  showBell = false,
  showSettings = false,
  onSearch,
  onBell,
  onSettings,
  backgroundColor = '#4a148c',
  style,
  screen,
  iconstyle,
}: HeaderProps) {
  return (
    <View style={[styles.header, { backgroundColor },style]}>
      <View style={styles.leftSection}>
        {showBack && (
          <TouchableOpacity style={[styles.iconButton,iconstyle]} onPress={onBack}>
            <ChevronLeft color="white" size={24} />
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.headerTitle}>{title}</Text>

      <View style={styles.rightSection}>
        {showSearch && (
          <TouchableOpacity style={styles.iconButton} onPress={onSearch}>
            <Search color="white" size={22} />
          </TouchableOpacity>
        )}
        {showBell && (
          <TouchableOpacity style={styles.iconButton} onPress={onBell}>
            <Bell color="white" size={22} />
          </TouchableOpacity>
        )}
        {showSettings && (
          <TouchableOpacity style={styles.iconButton} onPress={onSettings}>
            <Settings color="white" size={22} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute', // fixed positioning
    top: 60, // distance from top
    left: 0,
    right:0,
    zIndex: 999, // keeps it above content
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 12,
    width: '100%',
  },
  leftSection: { flexDirection: 'row', alignItems: 'center' },
  rightSection: { flexDirection: 'row', alignItems: 'center' },
  iconButton: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: { color: 'white', fontSize: 20, fontWeight: '600' },
});
