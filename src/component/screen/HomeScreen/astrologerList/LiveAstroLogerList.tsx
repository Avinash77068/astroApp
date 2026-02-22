import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { activeUser, Props } from './types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../../../app/navigation/AppStackScreen';
import { AstroLogerListStyles } from './LiveAstroLogerListCss';

const LiveAstroLogerList: React.FC<Props> = ({ data }) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();

  const renderItem = ({ item }: { item: activeUser }) => (
    <TouchableOpacity
      style={AstroLogerListStyles.itemContainer}
      onPress={() =>
        navigation.navigate('ChatWithAstrologer', { astrologer: item })
      }
    >
      <View style={AstroLogerListStyles.avatarWrapper}>
        <View style={AstroLogerListStyles.gradientBorder}>
          <Image
            source={{ uri: item.image }}
            style={AstroLogerListStyles.avatar}
          />
        </View>

        {item.isLive && (
          <View style={AstroLogerListStyles.liveBadge}>
            <View style={AstroLogerListStyles.dot} />
            <Text style={AstroLogerListStyles.liveText}>Live</Text>
          </View>
        )}
      </View>

      <Text numberOfLines={1} style={AstroLogerListStyles.name}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={data}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      contentContainerStyle={AstroLogerListStyles.container}
      style={{ flexGrow: 0 }}
    />
  );
};

export default LiveAstroLogerList;

