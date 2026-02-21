import { StyleSheet } from 'react-native';

export const SearchBarstyles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginVertical: 10,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 45,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: "#111827",
  },
  filterBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    paddingHorizontal: 12,
    height: 45,
    borderRadius: 12,
    backgroundColor: "#E5E7EB",
  },
  filterText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: "500",
    color: "#111827",
  },
});