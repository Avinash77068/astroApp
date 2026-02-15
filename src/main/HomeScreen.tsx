import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
  Animated,
} from 'react-native';

import { Menu, Search, Bell, Settings, ChevronRight, Home, Phone, MessageCircle, Video, User } from 'lucide-react-native';
import Sidebar from './Global/Sidebar';
import StarBackground from './Global/StarBackground';


const astrologers = [
  { name: 'Astro Vivek K', rating: 5.0, experience: '8 Years', price: 22, image: '👨‍🦱' },
  { name: 'Astro Vivek K', rating: 5.0, experience: '8 Years', price: 22, image: '👨‍🦰' },
  { name: 'Astro Vivek K', rating: 5.0, experience: '8 Years', price: 22, image: '👨‍🦲' },
];

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
  onOpen: () => void; 
  isOpen: boolean;
}

const HomeScreen = ({ onNavigate, onOpen, isOpen }: HomeScreenProps) => {


  return (
    <View  style={styles.container}>
      {/* Stars */}
      <StarBackground/>

      {/* Sidebar */}
      <Sidebar isOpen={isOpen} onClose={onOpen} onNavigate={onNavigate} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={[styles.header,styles.paddingHorizontal]}>
          <View style={styles.headerTop}>
            <TouchableOpacity onPress={onOpen} style={styles.iconButton}>
              <Menu size={24} color="white" />
            </TouchableOpacity>
            <View style={styles.headerActions}>
              <TouchableOpacity style={styles.iconButton}><Search size={22} color="white" /></TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}><Bell size={22} color="white" /></TouchableOpacity>
              <TouchableOpacity style={styles.iconButton} onPress={() => onNavigate('profile')}><Settings size={22} color="white" /></TouchableOpacity>
            </View>
          </View>

          <View style={styles.welcomeSection}>
            <Text style={styles.welcomeTitle}>Hi...! LOREUM</Text>
            <Text style={styles.welcomeDescription}>
              Find the solution for your Problems
            </Text>
          </View>
        </View>


        {/* Astrologers Section */}
        <View style={[styles.section,styles.paddingHorizontal]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top Astrologers</Text>
            <TouchableOpacity style={styles.seeAllBtn}><ChevronRight size={20} color="white" /></TouchableOpacity>
          </View>

          {astrologers.map((astro, index) => (
            <View key={index} style={styles.astrologerCard}>
              <View style={styles.astrologerAvatar}><Text>{astro.image}</Text></View>
              <View style={{flex:1}}>
                <Text style={styles.astrologerName}>{astro.name}</Text>
                <Text style={styles.astrologerDetails}>⭐ {astro.rating} • {astro.experience}</Text>
              </View>
              <TouchableOpacity style={styles.consultBtn}><Text style={{color:'white'}}>Consult</Text></TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Navigation Bar */}
      <View style={styles.navigationBar}>
        <TouchableOpacity style={[styles.navItem, styles.active]}><Home size={24} color="white"/><Text style={styles.navText}>Home</Text></TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => onNavigate('call')}><Phone size={24} color="white"/><Text style={styles.navText}>Call</Text></TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => onNavigate('chat-list')}><MessageCircle size={24} color="white"/><Text style={styles.navText}>Chat</Text></TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => onNavigate('profile')}><User size={24} color="white"/><Text style={styles.navText}>Profile</Text></TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container:{flex:1,width:'100%',backgroundColor:'rgba(255,255,255,0.1)'},
  scrollContent:{paddingBottom:"auto"},
  star:{position:'absolute', borderRadius:50, backgroundColor:'white'},
  header:{paddingTop:60},
  headerTop:{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:0},
  headerActions:{flexDirection:'row', gap:12},
  iconButton:{backgroundColor:'rgba(255,255,255,0.1)', width:40, height:40, borderRadius:10, alignItems:'center', justifyContent:'center'},
  welcomeSection:{marginTop:20},
  welcomeTitle:{color:'white', fontSize:36, fontWeight:'300', marginBottom:4},
  welcomeDescription:{color:'rgba(255,255,255,0.8)', fontSize:16},
  section:{marginBottom:32},
  sectionHeader:{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:16},
  sectionTitle:{color:'white', fontSize:20, fontWeight:'600'},
  seeAllBtn:{backgroundColor:'rgba(255,255,255,0.1)', width:32, height:32, borderRadius:8, alignItems:'center', justifyContent:'center'},
  zodiacCard:{backgroundColor:'rgba(255,255,255,0.1)', width:120, padding:16, borderRadius:12, alignItems:'center', marginRight:12},
  zodiacIcon:{fontSize:32},
  zodiacName:{color:'white', fontSize:13, fontWeight:'500'},
  liveCard:{width:140,height:140,backgroundColor:'rgba(124,77,255,0.3)',borderRadius:12,padding:12,marginRight:12,justifyContent:'space-between'},
  liveBadge:{backgroundColor:'#ff4444',padding:4,borderRadius:4,alignSelf:'flex-start'},
  liveAvatar:{fontSize:48,textAlign:'center'},
  liveViewers:{color:'white', fontSize:12, backgroundColor:'rgba(0,0,0,0.3)', padding:4, borderRadius:8, alignSelf:'flex-start'},
  astrologerCard:{flexDirection:'row', alignItems:'center', padding:16, borderRadius:12, backgroundColor:'rgba(255,255,255,0.1)', marginBottom:12},
  astrologerAvatar:{width:50, height:50, borderRadius:25, backgroundColor:'rgba(255,255,255,0.2)', alignItems:'center', justifyContent:'center', marginRight:12},
  astrologerName:{color:'white', fontSize:15, fontWeight:'600'},
  astrologerDetails:{color:'rgba(255,255,255,0.7)', fontSize:13},
  consultBtn:{backgroundColor:'#7c4dff', paddingHorizontal:12, paddingVertical:8, borderRadius:8, alignItems:'center', justifyContent:'center'},
  navigationBar:{position:'absolute', bottom:0, width:'100%', flexDirection:'row', justifyContent:'space-around', backgroundColor:'rgba(0,0,0,0.2)', paddingVertical:10},
  navItem:{alignItems:'center'},
  navText:{color:'white', fontSize:12},
  active:{},
  paddingHorizontal:{paddingHorizontal:16}
});
