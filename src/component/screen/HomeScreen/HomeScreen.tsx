
import React from 'react';
import { View, Text } from 'react-native';
import useSidebar from '../../../store/useSidebar';
import Sidebar from '../../common/Sidebar';
import { styles } from './HomeScreenCss';
import HorizontalNavbar from '../../common/Navbar';

const HomeScreen = () => {
  const { isSidebarOpen } = useSidebar();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <HorizontalNavbar />
      </View>

      {isSidebarOpen && <Sidebar />}

    </View>
  );
};

export default HomeScreen;

