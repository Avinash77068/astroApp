import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

interface Props {
  onPress?: () => void;
}

const FirstChatFreeBanner: React.FC<Props> = ({ onPress }) => {
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
      <Image
        source={require('./assets/firstChatFreeBanner.png')}
        style={{ width: '100%', height: 100 }}
      />
    </TouchableOpacity>
  );
};

export default FirstChatFreeBanner;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 12,
    padding: 16,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },

  subtitle: {
    fontSize: 12,
    color: '#FFEFEF',
    marginTop: 4,
  },

  cta: {
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },

  ctaText: {
    color: '#FF3C3C',
    fontWeight: '600',
    fontSize: 13,
  },
});
