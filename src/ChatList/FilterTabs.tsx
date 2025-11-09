import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface FilterTabsProps {
  selected: string;
  onSelect: (tab: string) => void;
}

export default function FilterTabs({ selected, onSelect }: FilterTabsProps) {
  const tabs = ['All', 'Vedic', 'Love', 'Palmistry'];

  return (
    <View style={styles.filterTabs}>
      {tabs.map(tab => (
        <TouchableOpacity
          key={tab}
          onPress={() => onSelect(tab)}
          style={[styles.filterTab, selected === tab && styles.filterTabActive]}
        >
          <Text style={styles.filterTabText}>{tab}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  filterTabs: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 12,
    gap: 10,
  },
  filterTab: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  filterTabActive: {
    backgroundColor: 'rgba(124,77,255,0.8)',
  },
  filterTabText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 13,
  },
});
