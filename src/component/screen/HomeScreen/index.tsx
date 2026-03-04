import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import useSidebar from '../../../store/useSidebar';
import SidebarComponent from '../../common/Sidebar';
import { styles } from './HomeScreenCss';
import { useHomepage } from '../../../hooks/useHomepage';
import { useAstroLoger } from '../../../hooks/useAstroLoger';
import SearchBar from '../../customComponent/SearchBar';

import FirstChatFreeBanner from './Banner/FirstChatFreeBanner';
import AstroFeatureGrid from './FeatureDashboard/AstroFeatureGrid';
import Button from '../../customComponent/Button';
import { MessageCircle, PhoneCall } from 'lucide-react-native';
import { LightColors } from '../../../constant/colors';
import LiveAstroLogerList from './astrologerList/LiveAstroLogerList';


const HomeScreen = () => {
  const { isSidebarOpen } = useSidebar();
  const { data: astrologerData } = useAstroLoger();
  const homepageData = useHomepage();
  
  const gridConfig = homepageData?.data?.gridConfig;
  const gridItems = gridConfig ? [
    gridConfig.showKundliButton?.show ? gridConfig.showKundliButton : null,
    gridConfig.showZodiacSigns?.show ? gridConfig.showZodiacSigns : null,
    gridConfig.horoscope?.show ? gridConfig.horoscope : null,
    gridConfig.dasha?.show ? gridConfig.dasha : null,
    gridConfig.transits?.show ? gridConfig.transits : null,
    gridConfig.liveAstrologer?.show ? gridConfig.liveAstrologer : null,
  ].filter(Boolean) : [];

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <SearchBar value="" onChangeText={() => {}} />
        <LiveAstroLogerList data={astrologerData?.astrologerList} />
        <FirstChatFreeBanner onPress={() => {}} />
        <AstroFeatureGrid
          data={gridItems}
          onPress={item => console.log('Navigate to:', item.route)}
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

      {isSidebarOpen && <SidebarComponent />}
    </View>
  );
};

export default HomeScreen;
