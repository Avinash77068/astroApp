import { StyleSheet } from "react-native";
import { LightColors } from "../../../../constant/colors";

export const AstroFeatureGridStyles = StyleSheet.create({
  card: {
    width: '30%',
    height: '100%',
    backgroundColor: LightColors.background,
    borderRadius: 10,
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
