
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import useSidebar from '../../../store/useSidebar';
import Sidebar from '../../common/Sidebar';
import { styles } from './HomeScreenCss';
import HorizontalNavbar from '../../common/Navbar';
import { useHomepage } from '../../../hooks/useHomepage';

const HomeScreen = () => {
  const { isSidebarOpen } = useSidebar();
  useHomepage();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <HorizontalNavbar />
        <Text style={styles.text}>HomeScreen</Text>
      </View>

      {isSidebarOpen && <Sidebar />}

    </View>
  );
};

export default HomeScreen;

