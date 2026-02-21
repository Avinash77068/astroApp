import { StyleSheet } from 'react-native';

const spacing = 16;
const width = 80;
const badgePadding = 8;

export const AstroLogerListStyles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing,
    paddingVertical: spacing,
    gap: spacing,
  },

  itemContainer: {
    alignItems: 'center',
    marginRight: 18,
  },

  avatarWrapper: {
    position: 'relative',
  },

  gradientBorder: {
    width: width,
    height: width,
    borderRadius: width / 2,
    padding: 3,
    backgroundColor: '#f26806ff', // You can replace with gradient later
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatar: {
    width: width - 2,
    height: width - 2,
    borderRadius: (width - 2) / 2,
  },

  liveBadge: {
    position: 'absolute',
    bottom: -4,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eb7018ff',
    paddingHorizontal: badgePadding,
    paddingVertical: badgePadding / 2,
    borderRadius: 12,
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#fff',
    marginRight: 4,
  },

  liveText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },

  name: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: '500',
    maxWidth: width,
    textAlign: 'center',
  },
});
