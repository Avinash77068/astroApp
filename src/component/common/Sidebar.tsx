import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import useSidebar from '../../store/useSidebar';
import { useHomepageStore } from '../../store/useHomeStore';
import { DarkColors } from '../../constant/colors';

const Sidebar = () => {
  const { closeSidebar } = useSidebar();
  const homepageData = useHomepageStore((state) => state.data);
  
  const sidebarConfig = homepageData?.sidebarConfig;
  const sidebarItems = sidebarConfig?.sidebarItems || [];
  const activeSidebarItems = sidebarItems
    .filter((item: any) => item.isActive)
    .sort((a: any, b: any) => a.order - b.order);

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
        <ScrollView showsVerticalScrollIndicator={false}>
          {activeSidebarItems.map((item: any) => (
            <TouchableOpacity
              key={item._id}
              style={styles.sidebarItemContainer}
              onPress={() => {
                console.log('Navigate to:', item.route);
                closeSidebar();
              }}
            >
              <Text style={styles.sidebarItem}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
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
  sidebarItemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: DarkColors.border,
  },
  sidebarItem: {
    fontSize: 16,
    paddingVertical: 12,
    color: '#333',
  },
});