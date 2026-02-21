import React, { useState } from 'react';
import { View } from 'react-native';
import { LightColors } from '../../../constant/colors';
import SearchBar from '../../customComponent/SearchBar';
import astroLogerList from '../../../data/astroLogerList';
import AstrologerList from './AstrologerList/AstrologerList';
import AstrologerFilterSheet from './AstrologerList/AstrologerFilterSheet';

const ChatScreen = () => {
  const [openFilterSheet, setOpenFilterSheet] = useState(false);
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
        onChatPress={item => console.log('Chat with', item.name)}
      />
    </View>
  );
};

export default ChatScreen;
