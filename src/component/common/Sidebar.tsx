import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import useSidebar from '../../store/useSidebar';
import { useHomepageStore } from '../../store/useHomeStore';
import { DarkColors, LightColors } from '../../constant/colors';
import { useAuthStore } from '../../store/authStore';
import AlertDialog from './AlertDialog';
import { useNavigation, CommonActions, NavigationProp } from '@react-navigation/native';
import { AppStackParamList } from '../../app/navigation/AppStackScreen';
import { 
  Gift, 
  Headphones, 
  Info, 
  FileText, 
  Shield, 
  Settings, 
  Globe, 
  LogOut,
  ChevronRight,
  User
} from 'lucide-react-native';

const Sidebar = () => {
  const { closeSidebar } = useSidebar();
  const homepageData = useHomepageStore((state) => state.data);
  const { logout, user } = useAuthStore();
  const navigation = useNavigation<NavigationProp<AppStackParamList>>();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  
  const appConfig = homepageData?.appConfig;
  
  const sidebarConfig = homepageData?.sidebarConfig;
  const sidebarItems = sidebarConfig?.sidebarItems || [];
  const activeSidebarItems = sidebarItems
    .filter((item: any) => item.isActive)
    .sort((a: any, b: any) => a.order - b.order);

  const handleLogout = async () => {
    try {
      await logout();
      closeSidebar();
      setShowLogoutDialog(false);
      
      // Reset navigation to Login screen
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        })
      );
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleMenuItemPress = (item: any) => {
    if (item.title?.toLowerCase() === 'logout' || item.route?.toLowerCase() === 'logout') {
      setShowLogoutDialog(true);
    } else {
      closeSidebar();
      navigation.navigate('GenericScreen', {
        title: item.title,
        route: item.route
      });
    }
  };

  const getIcon = (iconName: string) => {
    const iconProps = { size: 22, color: '#666' };
    switch (iconName?.toLowerCase()) {
      case 'gift':
        return <Gift {...iconProps} />;
      case 'support':
        return <Headphones {...iconProps} />;
      case 'info':
        return <Info {...iconProps} />;
      case 'terms':
        return <FileText {...iconProps} />;
      case 'privacy':
        return <Shield {...iconProps} />;
      case 'settings':
        return <Settings {...iconProps} />;
      case 'language':
        return <Globe {...iconProps} />;
      case 'logout':
        return <LogOut {...iconProps} color="#FF3B30" />;
      default:
        return <ChevronRight {...iconProps} />;
    }
  };

  return (
    <>
      {/* Overlay (Outside Click) */}
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={closeSidebar}
      />
      {/* Sidebar Panel */}
      <View style={styles.sidebar}>
        {/* User Profile Section */}
      

        {/* Menu Items */}
        <ScrollView 
          showsVerticalScrollIndicator={false}
          style={styles.menuScrollView}
        >
          {activeSidebarItems.map((item: any, index: number) => {
            const isLogout = item.title?.toLowerCase() === 'logout';
            return (
              <TouchableOpacity
                key={item._id}
                style={[
                  styles.menuItem,
                  isLogout && styles.logoutItem,
                  index === activeSidebarItems.length - 1 && styles.lastMenuItem
                ]}
                onPress={() => handleMenuItemPress(item)}
                activeOpacity={0.7}
              >
                <View style={styles.menuItemLeft}>
                  <View style={[styles.iconContainer, isLogout && styles.logoutIconContainer]}>
                    {getIcon(item.icon)}
                  </View>
                  <Text style={[styles.menuItemText, isLogout && styles.logoutText]}>
                    {item.title}
                  </Text>
                </View>
                <ChevronRight size={18} color={isLogout ? '#FF3B30' : '#999'} />
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* App Version */}
        <View style={styles.footer}>
          <Text style={styles.appVersion}>Version 1.0.0</Text>
        </View>
      </View>
      
      <AlertDialog
        visible={showLogoutDialog}
        title="Logout"
        message="Are you sure you want to logout? All your data will be cleared."
        onCancel={() => setShowLogoutDialog(false)}
        onConfirm={handleLogout}
        cancelText="Cancel"
        confirmText="Logout"
        confirmButtonColor="#FF3B30"
      />
    </>
  );
};

export default Sidebar;

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 280,
    backgroundColor: '#fff',
    zIndex: 2,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  profileSection: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: LightColors.primary,
  },
  avatarContainer: {
    marginBottom: 12,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#fff',
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FF7A18',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  userPhone: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
  menuScrollView: {
    flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  lastMenuItem: {
    borderBottomWidth: 0,
  },
  logoutItem: {
    backgroundColor: '#FFF5F5',
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#FFE5E5',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  logoutIconContainer: {
    backgroundColor: '#FFE5E5',
  },
  menuItemText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  logoutText: {
    color: '#FF3B30',
    fontWeight: '600',
  },
  footer: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    alignItems: 'center',
  },
  appVersion: {
    fontSize: 12,
    color: '#999',
  },
});