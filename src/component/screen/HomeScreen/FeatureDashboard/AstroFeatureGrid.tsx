import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');
const CARD_SIZE = (width - 48) / 3;

interface FeatureItem {
  id: string;
  title: string;
  icon: any;
}

interface Props {
  data: FeatureItem[];
  onPress?: (item: FeatureItem) => void;
}

const AstroFeatureGrid: React.FC<Props> = ({ data, onPress }) => {
  const renderItem = ({ item }: { item: FeatureItem }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={() => onPress?.(item)}
    >
      <Image source={item.icon} style={styles.icon} />
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={data}
      numColumns={3}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      columnWrapperStyle={{ justifyContent: 'space-between' }}
      contentContainerStyle={styles.container}
    />
  );
};

export default AstroFeatureGrid;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },

  card: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    backgroundColor: '#F4E6D7',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },

  icon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginBottom: 8,
  },

  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C2C2C',
  },
});
