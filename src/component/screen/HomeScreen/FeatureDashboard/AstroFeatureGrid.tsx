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
  const renderItem = ({ item }: { item: FeatureItem }) => {
    const displayText = item.text || item.title || '';
    const displayIcon = item.logo || item.icon || '';
    const bgColor = item.backgroundColor || '#fff';
    const txtColor = item.textColor || '#000';

    return (
      <TouchableOpacity
        style={[AstroFeatureGridStyles.card, { backgroundColor: bgColor }]}
        activeOpacity={0.85}
        onPress={() => onPress?.(item)}
      >
        <Image source={{ uri: displayIcon }} style={AstroFeatureGridStyles.icon} />
        <Text style={[AstroFeatureGridStyles.title, { color: txtColor }]}>
          {displayText}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={data}
      numColumns={3}
      keyExtractor={(item, index) => item.id || item.route || index.toString()}
      renderItem={renderItem}
      columnWrapperStyle={{ justifyContent: 'space-between' }}
      contentContainerStyle={{ paddingHorizontal: Spacing.md}}
    />
  );
};

export default AstroFeatureGrid;
