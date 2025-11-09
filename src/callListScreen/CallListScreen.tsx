import React, { useState } from 'react';
import { View, ScrollView, FlatList, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FilterTabs from './FilterTabs';
import AstrologerCard from './AstrologerCard';
import astrologersData from '../Global/astrologersData';


export default function CallListScreen({
  onBack,
  onCall,
}: {
  onBack: () => void;
  onCall: () => void;
}) {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const filters = ['All', 'Vedic', 'Love', 'Palmistry'];

  return (
    <LinearGradient colors={['#4a148c', '#6a1b9a']} style={styles.screen}>
      

      <FilterTabs
        filters={filters}
        selectedFilter={selectedFilter}
        onSelect={setSelectedFilter}
      />

      <FlatList
        data={astrologersData}
        keyExtractor={(_, i) => i.toString()}
        contentContainerStyle={styles.content}
        renderItem={({ item }) => (
          <AstrologerCard item={item} onCall={onCall} />
        )}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    minHeight: '100%',
  },
  content: {
    flex: 1,
  },
});
