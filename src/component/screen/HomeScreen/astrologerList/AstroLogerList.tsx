import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { AstroLogerListStyles } from './AstroLogerListCss';
import { LiveUser, Props } from './types';

const AstroLogerList: React.FC<Props> = ({ data, onPress }) => {
  const renderItem = ({ item }: { item: LiveUser }) => (
    <TouchableOpacity
      style={AstroLogerListStyles.itemContainer}
      onPress={() => onPress?.(item)}
    >
      <View style={AstroLogerListStyles.avatarWrapper}>
        <View style={ AstroLogerListStyles.gradientBorder}>
          <Image source={{ uri: item.image }} style={AstroLogerListStyles.avatar} />
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
    />
  );
};

export default AstroLogerList;

