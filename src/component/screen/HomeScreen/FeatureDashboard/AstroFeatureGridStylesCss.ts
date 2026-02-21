import { Dimensions, StyleSheet } from "react-native";
const { width } = Dimensions.get('window');
const SPACING = 16;
const CARD_SIZE = (width - SPACING * 4) / 3; // perfect 3 column

export const AstroFeatureGridStyles = StyleSheet.create({
  card: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    backgroundColor: '#F4E6D7',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 6,
  },

  icon: {
    width: 55,
    height: 55,
    borderRadius: 50,
    resizeMode: 'contain',
    marginBottom: 8,
  },

  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C2C2C',
  },
});
