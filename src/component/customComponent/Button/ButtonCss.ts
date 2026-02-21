import { StyleSheet } from 'react-native';

export const Buttonstyles = StyleSheet.create({
  base: {
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  primary: {
    backgroundColor: "#4F46E5",
  },

  secondary: {
    backgroundColor: "#6B7280",
  },

  outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#111827",
  },

  danger: {
    backgroundColor: "#DC2626",
  },

  disabled: {
    opacity: 0.6,
  },

  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  outlineText: {
    color: "#111827",
  },
});
