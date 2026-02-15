import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Home, Phone, MessageCircle, User } from 'lucide-react-native';

const BottomStackNavigator = ({
  onNavigate,
}: {
  onNavigate: (screen: string) => void;
}) => {
  return (
    <View style={styles.navigationBar}>
      <TouchableOpacity style={[styles.navItem]}>
        <Home size={24} color="white"/>
        <Text style={styles.navText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => onNavigate('call')}
      >
        <Phone size={24} color="white" />
        <Text style={styles.navText}>Call</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => onNavigate('chat-list')}
      >
        <MessageCircle size={24} color="white" />
        <Text style={styles.navText}>Chat</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => onNavigate('profile')}
      >
        <User size={24} color="white" />
        <Text style={styles.navText}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  navigationBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 26,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  navText: {
    color: 'white',
    fontSize: 14,
  },
});

export default BottomStackNavigator;
