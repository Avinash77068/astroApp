
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import useSidebar from '../../../store/useSidebar';
import Sidebar from '../../common/Sidebar';


const HomeScreen = () => {
  const { isSidebarOpen } = useSidebar();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text>✨ Daily Horoscope</Text>
      </View>

      {isSidebarOpen && <Sidebar />}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
