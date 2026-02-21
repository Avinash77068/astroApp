
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import useSidebar from '../../../store/useSidebar';
import Sidebar from '../../common/Sidebar';
import { styles } from './HomeScreenCss';
import { useHomepage } from '../../../hooks/useHomepage';
import { useAstroLoger } from '../../../hooks/useAstroLoger';
import SearchBar from '../../customComponent/SearchBar';
import AstroLogerList from './astrologerList/AstroLogerList';
import liveUsers from '../../../data/liveUsers';
import FirstChatFreeBanner from './Banner/FirstChatFreeBanner';

const HomeScreen = () => {
  const { isSidebarOpen } = useSidebar();
  useHomepage();
  useAstroLoger();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <SearchBar value="" onChangeText={() => {}} />
        <AstroLogerList data={liveUsers} />
        <FirstChatFreeBanner onPress={() => {}} />
      </View>

      {isSidebarOpen && <Sidebar />}
    </View>
  );
};

export default HomeScreen;

