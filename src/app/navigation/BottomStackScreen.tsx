import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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
  View,
} from 'lucide-react-native';


const Tab = createBottomTabNavigator();

export default function BottomStackScreen() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        headerLeft: () => (
          <ArrowLeft size={24} style={{ marginHorizontal: 16 }} />
        ),
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
          headerLeft: () => <Menu size={24} style={{ marginHorizontal: 16 }} />,
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
