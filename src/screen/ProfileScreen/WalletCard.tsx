import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function WalletCard() {
  return (
    <View style={styles.walletCard}>
      <View style={styles.walletHeader}>
        <Text style={styles.walletTitle}>My Wallet</Text>
        <TouchableOpacity style={styles.walletAction}>
          <Text style={{ color: '#fff' }}>Add Money</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.walletBalance}>
        <Text style={styles.balanceLabel}>Balance</Text>
        <Text style={styles.balanceAmount}>$0.00</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  walletCard: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    margin: 16,
    borderRadius: 16,
    padding: 16,
  },
  walletHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  walletTitle: { color: '#fff', fontSize: 16, fontWeight: '600' },
  walletAction: { backgroundColor: '#7c4dff', padding: 8, borderRadius: 8 },
  walletBalance: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
  },
  balanceLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 12 },
  balanceAmount: { color: '#fff', fontSize: 18, fontWeight: '700' },
});
