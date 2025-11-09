import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface FilterTabsProps {
  filters: string[];
  selectedFilter: string;
  onSelect: (filter: string) => void;
}

export default function FilterTabs({
  filters,
  selectedFilter,
  onSelect,
}: FilterTabsProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.filterTabs}
    >
      {filters.map((filter) => (
        <TouchableOpacity
          key={filter}
          onPress={() => onSelect(filter)}
          activeOpacity={0.8}
          style={[
            styles.filterTab,
            selectedFilter === filter && styles.activeTab,
          ]}
        >
          <Text
            style={[
              styles.filterText,
              selectedFilter === filter && styles.activeFilterText,
            ]}
          >
            {filter}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  filterTabs: {
    paddingHorizontal: 20,
    paddingTop: 80,
    paddingBottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  filterTab: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#7c4dff',
    borderColor: 'transparent',
    shadowColor: '#7c4dff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 6,
  },
  filterText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    fontWeight: '500',
  },
  activeFilterText: {
    color: 'white',
    fontWeight: '600',
  },
});
