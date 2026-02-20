import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const tabs = ['Home', 'Kundli', 'Chat', 'Profile', 'Reports', 'Wallet'];

const HorizontalNavbar = () => {
  const [activeTab, setActiveTab] = useState('Home');

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[styles.tabText, activeTab === tab && styles.activeText]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default HorizontalNavbar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingVertical: 10,
  },
  scrollContainer: {
    paddingHorizontal: 12,
  },
  tab: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F1F1F1',
    marginRight: 10,
  },
  activeTab: {
    backgroundColor: '#7C3AED',
  },
  tabText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  activeText: {
    color: '#fff',
  },
});
