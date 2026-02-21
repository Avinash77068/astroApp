import React from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { Search, SlidersHorizontal } from 'lucide-react-native';
import { SearchBarstyles } from './SearchBarCss';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  onFilterPress?: () => void;
  placeholder?: string;
  containerStyle?: any;
}

const SearchBar: React.FC<Props> = ({
  value,
  onChangeText,
  onFilterPress,
  placeholder = 'Search...',
  containerStyle,
}) => {
  return (
    <View style={[SearchBarstyles.wrapper, containerStyle]}>
      {/* Search Input */}
      <View style={SearchBarstyles.searchContainer}>
        <Search size={18} color="#6B7280" />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          style={SearchBarstyles.input}
          placeholderTextColor="#9CA3AF"
        />
      </View>

      {/* Filter Button */}
      <TouchableOpacity style={SearchBarstyles.filterBtn} onPress={onFilterPress}>
        <SlidersHorizontal size={18} color="#374151" />
        <Text style={SearchBarstyles.filterText}>Filter</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
