import { StyleSheet, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Menu, Search, Bell, Settings } from 'lucide-react-native'

export default function ArrowIcons({ onOpen, onNavigate }: any) {
  return (
    <View style={[styles.header ]}>
      <View style={styles.headerTop}>
        <TouchableOpacity onPress={onOpen} style={styles.iconButton}>
          <Menu size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconButton}>
            <Search size={22} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Bell size={22} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => onNavigate('profile')}
          >
            <Settings size={22} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: { paddingTop: 60,width:'100%',marginBottom:20 },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerActions: { flexDirection: 'row', gap: 12 },
  iconButton: { backgroundColor: 'rgba(255,255,255,0.1)', width: 40, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
})
