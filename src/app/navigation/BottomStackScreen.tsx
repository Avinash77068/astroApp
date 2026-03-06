import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, Image } from 'react-native';
import ProfileScreen from '../../component/screen/ProfileScreen/ProfileScreen';
import HomeScreen from '../../component/screen/HomeScreen';
import KundliFormScreen from '../../component/screen/KundliFormScreen/KundliFormScreen';
import ChatScreen from '../../component/screen/ChatScreen';
import {
  ArrowLeft,
  Bell,
  Home,
  Menu,
  MessageCircle,
  Stars,
  User,
  Wallet,
} from 'lucide-react-native';
import useSidebar from '../../store/useSidebar';
import { View } from 'react-native';
import { useHomepage } from '../../hooks/useHomepage';
import { useAuthStore } from '../../store/authStore';

const Tab = createBottomTabNavigator();

export default function BottomStackScreen() {
  const { toggleSidebar, isSidebarOpen: sidebar } = useSidebar();
  const { data: homeData } = useHomepage();
  const {  user } = useAuthStore()
  const appConfig: any = homeData?.appConfig;

  return (
    <Tab.Navigator
      screenOptions={({ navigation, route }) => ({
        headerShown: true,
        headerLeft: () => {
          if (route.name === 'Home') {
            return (
              <TouchableOpacity
                onPress={toggleSidebar}
                style={{ marginHorizontal: 16 }}
              >
                {!sidebar ? (
                  <Menu size={24} />
                ) : (
                  <Image
                    source={{ uri: appConfig?.logo }}
                    style={{ width: 50, height: 50, borderRadius: 50 }}
                  />
                )}
              </TouchableOpacity>
            );
          }

          if (!navigation.canGoBack()) {
            return null;
          }

          return (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ marginHorizontal: 16 }}
            >
              <ArrowLeft size={24} />
            </TouchableOpacity>
          );
        },
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
        headerRight: () => (
          <View style={{ marginHorizontal: 16, flexDirection: 'row', gap: 16 }}>
            <Bell size={24} />
            <Wallet size={24} />
          </View>
        ),
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: () => <Home />,
          headerTitle:
            !sidebar ? appConfig?.appName : user?.name ,
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
