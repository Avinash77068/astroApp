import React from 'react';
import {
  Text,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import { AstroFeatureGridStyles } from './AstroFeatureGridStylesCss';
import { Spacing } from '../../../../constant/colors';
import { FeatureItem, Props } from './types';


const AstroFeatureGrid: React.FC<Props> = ({ data, onPress }) => {
  const renderItem = ({ item }: { item: FeatureItem }) => (
    <TouchableOpacity
      style={AstroFeatureGridStyles.card}
      activeOpacity={0.85}
      onPress={() => onPress?.(item)}
    >
      <Image source={{ uri: item.icon }} style={AstroFeatureGridStyles.icon} />
      <Text style={AstroFeatureGridStyles.title}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={data}
      numColumns={3}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      columnWrapperStyle={{ justifyContent: 'space-between' }}
      contentContainerStyle={{ paddingHorizontal: Spacing.md, paddingTop: 16 }}
    />
  );
};

export default AstroFeatureGrid;
