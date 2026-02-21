import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';

interface Props {
  onApply?: (filters: any) => void;
  onReset?: () => void;
  data: any[];
}

const expertiseOptions = [
  'Vedic',
  'Tarot',
  'Numerology',
  'Palmistry',
  'Vastu',
  'KP',
];

const experienceOptions = ['0-3 yrs', '3-7 yrs', '7+ yrs'];
const priceOptions = ['Below ₹20', '₹20 - ₹40', 'Above ₹40'];

const AstrologerFilterSheet: React.FC<Props> = ({ onApply, onReset, data }) => {
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<string | null>(
    null,
  );
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [onlineOnly, setOnlineOnly] = useState(false);

  const toggleExpertise = (item: string) => {
    setSelectedExpertise(prev =>
      prev.includes(item) ? prev.filter(e => e !== item) : [...prev, item],
    );
  };

  const handleApply = () => {
    onApply?.({
      expertise: selectedExpertise,
      experience: selectedExperience,
      price: selectedPrice,
      onlineOnly,
    });
  };

  const handleReset = () => {
    setSelectedExpertise([]);
    setSelectedExperience(null);
    setSelectedPrice(null);
    setOnlineOnly(false);
    onReset?.();
  };

  const renderChip = (
    label: string,
    selected: boolean,
    onPress: () => void,
  ) => (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.chip, selected && { backgroundColor: '#FF7A18' }]}
    >
      <Text style={[styles.chipText, selected && { color: '#fff' }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Expertise</Text>
        <View style={styles.rowWrap}>
          {expertiseOptions.map(item =>
            renderChip(item, selectedExpertise.includes(item), () =>
              toggleExpertise(item),
            ),
          )}
        </View>

        <Text style={styles.sectionTitle}>Experience</Text>
        <View style={styles.rowWrap}>
          {experienceOptions.map(item =>
            renderChip(item, selectedExperience === item, () =>
              setSelectedExperience(item),
            ),
          )}
        </View>

        <Text style={styles.sectionTitle}>Price</Text>
        <View style={styles.rowWrap}>
          {priceOptions.map(item =>
            renderChip(item, selectedPrice === item, () =>
              setSelectedPrice(item),
            ),
          )}
        </View>

        <View style={styles.onlineRow}>
          <Text style={styles.sectionTitle}>Online Only</Text>
          <Switch
            value={onlineOnly}
            onValueChange={setOnlineOnly}
            trackColor={{ false: '#ccc', true: '#FF7A18' }}
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.resetBtn} onPress={handleReset}>
          <Text style={styles.resetText}>Reset</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.applyBtn} onPress={handleApply}>
          <Text style={styles.applyText}>Apply Filters</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AstrologerFilterSheet;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    height: "90%",
    zIndex: 9999
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
    marginTop: 16,
  },

  rowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },

  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: '#F4E6D7',
    borderRadius: 20,
    marginBottom: 10,
  },

  chipText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#2C2C2C',
  },

  onlineRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },

  footer: {
    flexDirection: 'row',
    marginTop: 20,
  },

  resetBtn: {
    flex: 1,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FF7A18',
    alignItems: 'center',
    marginRight: 8,
  },

  resetText: {
    color: '#FF7A18',
    fontWeight: '600',
  },

  applyBtn: {
    flex: 2,
    backgroundColor: '#FF7A18',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },

  applyText: {
    color: '#fff',
    fontWeight: '700',
  },
});
