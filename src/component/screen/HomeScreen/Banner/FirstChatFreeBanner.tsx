import React from 'react';
import { TouchableOpacity, Image, Text } from 'react-native';
const freeBannerImage = require('../../../../../assets/firstChatFreeBanner.png');
interface Props {
  onPress?: () => void;
}

const FirstChatFreeBanner: React.FC<Props> = ({ onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      style={{
        width: '96%',
        flexDirection: 'row',
        paddingVertical: '5%',
        overflow: 'hidden',
      }}
    >
      <Image
        source={freeBannerImage}
        style={{
          width: '100%',
          aspectRatio: 375 / 100,
        }}
        resizeMode="stretch"
      />
    </TouchableOpacity>
  );
};

export default FirstChatFreeBanner;
