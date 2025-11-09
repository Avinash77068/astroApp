import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Phone, MessageCircle } from 'lucide-react-native';

export default function AstrologerCard({ item, onCall }: any) {
  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarEmoji}>👨‍💼</Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.status}>{item.status}</Text>
          <Text style={styles.meta}>
            {item.language} • ⭐ {item.rating} • {item.experience}
          </Text>
        </View>

        {item.online && <View style={styles.onlineDot} />}
      </View>

      {/* Buttons */}
      <View style={styles.actions}>
        <TouchableOpacity style={[styles.btn, styles.chatBtn]}>
          <MessageCircle color="white" size={18} />
          <Text style={styles.btnText}>Contact</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, styles.callBtn]} onPress={onCall}>
          <Phone color="white" size={18} />
          <Text style={styles.btnText}>Call</Text>
        </TouchableOpacity>
      </View>

      {/* Price */}
      <Text style={styles.price}>${item.price}/min</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginVertical: 8,
    padding: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarEmoji: { fontSize: 24 },
  onlineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4caf50',
    marginLeft: 6,
  },
  name: { color: 'white', fontSize: 16, fontWeight: '600' },
  status: { color: 'rgba(255,255,255,0.8)', fontSize: 13 },
  meta: { color: 'rgba(255,255,255,0.6)', fontSize: 12, marginTop: 4 },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 10,
  },
  btn: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  chatBtn: {
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  callBtn: {
    backgroundColor: '#4caf50',
  },
  btnText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  price: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '700',
    marginTop: 8,
  },
});
