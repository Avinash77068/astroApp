import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity } from 'react-native';
import ProfileScreen from '../../component/screen/ProfileScreen';
import HomeScreen from '../../component/screen/HomeScreen';
import KundliFormScreen from '../../component/screen/KundliFormScreen';
import ChatScreen from '../../component/screen/ChatScreen';
import {
  ArrowLeft,
  Home,
  Menu,
  MessageCircle,
  Stars,
  User,
} from 'lucide-react-native';
import useSidebar from '../../store/useSidebar';
import { useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

export default function BottomStackScreen() {
  const { toggleSidebar } = useSidebar();
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        headerLeft: () => <ArrowLeft size={24} style={{ marginHorizontal: 16 }} onPress={() => navigation.goBack()} />,
        headerStyle: {
          backgroundColor: 'white',
        },
        headerTitleStyle: {
          color: 'black',
        },
        headerTintColor: 'black',
        tabBarStyle: {
          backgroundColor: 'white',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: () => <Home />,
          headerLeft: () => (
            <TouchableOpacity onPress={toggleSidebar} style={{ marginHorizontal: 16 }}>
              <Menu size={24} />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Kundli"
        component={KundliFormScreen}
        options={{
          tabBarIcon: () => <Stars size={24} />,
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarIcon: () => <MessageCircle />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: () => <User />,
        }}
      />
    </Tab.Navigator>
  );
}
