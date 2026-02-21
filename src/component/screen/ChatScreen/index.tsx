import React, { useState } from 'react';
import { View } from 'react-native';
import { LightColors } from '../../../constant/colors';
import SearchBar from '../../customComponent/SearchBar';
import astroLogerList from '../../../data/astroLogerList';
import AstrologerList from './AstrologerList/AstrologerList';
import AstrologerFilterSheet from './AstrologerList/AstrologerFilterSheet';
import { useNavigation, NavigationProp } from '@react-navigation/native';

const ChatScreen = () => {
  const [openFilterSheet, setOpenFilterSheet] = useState(false);
  const navigation = useNavigation<any>();
  
  const handleChatPress = (item: any) => {
    const parentNav = navigation.getParent();
    if (parentNav) {
      parentNav.navigate('ChatWithAstrologer', { astrologer: item });
    }
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: LightColors.background,
      }}
    >
      <SearchBar
        value=""
        onFilterPress={() => {
          setOpenFilterSheet(!openFilterSheet);
        }}
      />
      {openFilterSheet && (
        <AstrologerFilterSheet
          data={[]}
          onApply={() => {
            setOpenFilterSheet(false);
          }}
          onReset={() => {
            setOpenFilterSheet(false);
          }}
        />
      )}
      <AstrologerList
        data={astroLogerList}
        onChatPress={handleChatPress}
      />
    </View>
  );
};

export default ChatScreen;
