import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import useSidebar from '../../../store/useSidebar';
import Sidebar from '../../common/Sidebar';
import { styles } from './HomeScreenCss';
import { useHomepage } from '../../../hooks/useHomepage';
import { useAstroLoger } from '../../../hooks/useAstroLoger';
import SearchBar from '../../customComponent/SearchBar';

import FirstChatFreeBanner from './Banner/FirstChatFreeBanner';
import astroLogerList from '../../../data/astroLogerList';
import AstroFeatureGrid from './FeatureDashboard/AstroFeatureGrid';
import featuresList from '../../../data/featuresList';
import Button from '../../customComponent/Button';
import { useNavigation } from '@react-navigation/native';
import { MessageCircle, PhoneCall } from 'lucide-react-native';
import { LightColors } from '../../../constant/colors';
import LiveAstroLogerList from './astrologerList/LiveAstroLogerList';

const HomeScreen = () => {
  const { isSidebarOpen } = useSidebar();
  useHomepage();
  useAstroLoger();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <SearchBar value="" onChangeText={() => {}} />
        <LiveAstroLogerList data={astroLogerList} />
        <FirstChatFreeBanner onPress={() => {}} />
        <AstroFeatureGrid
          data={featuresList}
          onPress={item => console.log(item.title)}
        />
        <View style={styles.buttonContainer}>
          <Button
            title="Call"
            onPress={() => {}}
            variant="primary"
            fullWidth={false}
            style={{
              flexDirection: 'row',
              gap: 8,
              backgroundColor: LightColors.secondary,
            }}
          >
            <PhoneCall size={20} color="#fff" />
          </Button>
          <Button
            onPress={() => {}}
            variant="primary"
            fullWidth={false}
            title="Free Chat"
            style={{
              flexDirection: 'row',
              gap: 8,
              backgroundColor: LightColors.gradient,
            }}
          >
            <MessageCircle size={20} color="#fff" />
          </Button>
        </View>
      </View>

      {isSidebarOpen && <Sidebar />}
    </View>
  );
};

export default HomeScreen;
