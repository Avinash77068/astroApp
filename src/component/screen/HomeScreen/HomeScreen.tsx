
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import useSidebar from '../../../store/useSidebar';
import Sidebar from '../../common/Sidebar';
import { styles } from './HomeScreenCss';
import { useHomepage } from '../../../hooks/useHomepage';
import { useAstroLoger } from '../../../hooks/useAstroLoger';
import SearchBar from '../../customComponent/SearchBar';
import AstroLogerList from './astrologerList/AstroLogerList';

import FirstChatFreeBanner from './Banner/FirstChatFreeBanner';
import astroLogerList from '../../../data/astroLogerList';
import AstroFeatureGrid from './FeatureDashboard/AstroFeatureGrid';
import featuresList from '../../../data/featuresList';
import Button from '../../customComponent/Button';


const HomeScreen = () => {
  const { isSidebarOpen } = useSidebar();
  useHomepage();
  useAstroLoger();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <SearchBar value="" onChangeText={() => {}} />
        <AstroLogerList data={astroLogerList} />
        <FirstChatFreeBanner onPress={() => {}} />
        <AstroFeatureGrid
          data={featuresList}
          onPress={item => console.log(item.title)}
        />
        <View style={styles.buttonContainer}>
          <Button
            title="Get Started"
            onPress={() => {}}
            variant="primary"
            fullWidth={false}
          />
          <Button
            title="Get Started"
            onPress={() => {}}
            variant="primary"
            fullWidth={false}
          />
        </View>
      </View>

      {isSidebarOpen && <Sidebar />}
    </View>
  );
};

export default HomeScreen;

