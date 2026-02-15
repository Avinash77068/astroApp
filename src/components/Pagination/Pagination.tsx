import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, spacing } from '../../theme';

interface PaginationProps {
  total: number;
  current: number;
}

const Pagination = memo<PaginationProps>(({ total, current }) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: total }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            index === current && styles.activeDot,
          ]}
        />
      ))}
    </View>
  );
});

Pagination.displayName = 'Pagination';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.text.disabled,
  },
  activeDot: {
    width: 24,
    backgroundColor: colors.primary,
  },
});

export default Pagination;
