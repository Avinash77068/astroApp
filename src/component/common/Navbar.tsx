import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { BorderColor, LightColors } from '../../constant/colors';
import { tabs } from '../../constant/string';

const HorizontalNavbar = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

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
    backgroundColor: LightColors.background,
    paddingVertical: 8,
    height: '7%',
  },
  scrollContainer: {
    paddingHorizontal: 12,
  },
  tab: {
    paddingHorizontal: 5,
    paddingVertical: 8,
    marginHorizontal: 15,
  },
  activeTab: {
    borderColor: BorderColor.primary,
    borderWidth: 2,
    color: LightColors.primary,
    borderBottomColor: LightColors.primary,
  },
  tabText: {
    fontSize: 16,
    color: LightColors.textPrimary,
    fontWeight: '600' as const,
  },
  activeText: {
    color: LightColors.primary,
  },
});
