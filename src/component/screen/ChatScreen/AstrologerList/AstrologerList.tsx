import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';

interface Astrologer {
  id: string;
  name: string;
  image: string;
  expertise: string;
  experience: string;
  price: string;
  status: number;
  isLive: number;
}

interface Props {
  data: Astrologer[];
  onChatPress?: (item: Astrologer) => void;
}

const AstrologerList: React.FC<Props> = ({ data, onChatPress }) => {
  const renderItem = ({ item }: { item: Astrologer }) => (
    <View style={AstrologerListstyles.card}>
      {/* Profile Section */}
      <View style={AstrologerListstyles.leftSection}>
        <View>
          <Image
            source={{ uri: item.image }}
            style={AstrologerListstyles.avatar}
          />
          <View
            style={[
              AstrologerListstyles.statusDot,
              {
                backgroundColor:
                  item.status === 1
                    ? '#FF7A18'
                    : item.status === 2
                    ? '#FFD700'
                    : item.status === 3
                    ? '#2ECC71'
                    : '#D3D3D3',
              },
            ]}
          />
        </View>

        <View style={AstrologerListstyles.info}>
          <Text style={AstrologerListstyles.name}>{item.name}</Text>
          <Text style={AstrologerListstyles.expertise}>{item.expertise}</Text>
          <Text style={AstrologerListstyles.meta}>
            {item.experience} • ₹{item.price}/min
          </Text>
        </View>
      </View>

      {/* Chat Button */}
      <TouchableOpacity
        style={[
          AstrologerListstyles.chatBtn,
          {
            backgroundColor:
              item.status === 1
                ? '#FF7A18'
                : item.status === 2
                ? '#FFD700'
                : item.status === 3
                ? '#2ECC71'
                : '#D3D3D3',
          },
        ]}
        disabled={item.status !== 3}
        onPress={() => onChatPress?.(item)}
      >
        <Text style={AstrologerListstyles.chatText}>
          {item.status === 1
            ? 'Chat Now'
            : item.status === 2
            ? 'Busy'
            : item.status === 3
            ? 'Online'
            : 'Offline'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      contentContainerStyle={{ padding: 16 }}
      showsVerticalScrollIndicator={false}
      style={{ flexGrow: 0 }}
    />
  );
};

export default AstrologerList;

const AstrologerListstyles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3,
  },

  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },

  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    position: 'absolute',
    bottom: 2,
    right: 2,
    borderWidth: 2,
    borderColor: '#fff',
  },

  info: {
    marginLeft: 12,
  },

  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2C2C2C',
  },

  expertise: {
    fontSize: 13,
    color: '#777',
    marginTop: 2,
  },

  meta: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },

  chatBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },

  chatText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },
});
