import { Dimensions, StyleSheet } from "react-native";
import { LightColors } from "../../../../constant/colors";
const { width } = Dimensions.get('window');
const SPACING = 16;
const CARD_SIZE = (width - SPACING * 4) / 3; // perfect 3 column

export const AstroFeatureGridStyles = StyleSheet.create({
  card: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    backgroundColor: LightColors.background,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 6,
  },

  icon: {
    width: 50,
    height: 50,
    borderRadius: 50,
    resizeMode: 'contain',
    marginBottom: 8,
  },

  title: {
    fontSize: 12,
    fontWeight: '600',
    color: LightColors.textPrimary,
  },
});
