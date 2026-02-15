import React, { useEffect, useRef, memo, useCallback } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { Home, Phone, MessageCircle, Video, User, LogOut, Moon, Star } from 'lucide-react-native';
import { colors, spacing, typography } from '../theme';
import { SIDEBAR_WIDTH, ICON_SIZES, ANIMATION_DURATION } from '../constants';
import { ScreenName } from '../types';

interface SidebarProps {
  onNavigate: (screen: ScreenName) => void;
  isOpen: boolean;
  onClose: () => void;
}

interface MenuItem {
  icon: React.ComponentType<{ size: number; color: string }>;
  label: string;
  screen: ScreenName;
}

const menuItems: MenuItem[] = [
  { icon: Home, label: 'Home', screen: 'splash' },
  { icon: Phone, label: 'Call', screen: 'call' },
  { icon: MessageCircle, label: 'Chat', screen: 'chat-list' },
  { icon: Video, label: 'Live', screen: 'live' },
  { icon: User, label: 'Profile', screen: 'profile' },
];

const Sidebar = memo<SidebarProps>(({ onNavigate, isOpen, onClose }) => {
  const slideAnim = useRef(new Animated.Value(-SIDEBAR_WIDTH)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: isOpen ? 0 : -SIDEBAR_WIDTH,
        duration: ANIMATION_DURATION.normal,
        useNativeDriver: true,
      }),
      Animated.timing(overlayOpacity, {
        toValue: isOpen ? 1 : 0,
        duration: ANIMATION_DURATION.normal,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isOpen, slideAnim, overlayOpacity]);

  const handleNavigate = useCallback((screen: ScreenName) => {
    onNavigate(screen);
    onClose();
  }, [onNavigate, onClose]);

  return (
    <Animated.View
      style={[styles.overlay, { opacity: overlayOpacity }]}
      pointerEvents={isOpen ? 'auto' : 'none'}
    >
      <TouchableOpacity style={styles.overlayTouchable} onPress={onClose} activeOpacity={1} />
      <Animated.View style={[styles.sidebar, { transform: [{ translateX: slideAnim }] }]}>
        <View style={styles.header}>
          <View style={styles.logo}>
            <Moon size={ICON_SIZES.xl + 2} color={colors.secondary} />
            <Text style={styles.logoText}>Astro Avi</Text>
          </View>
        </View>

        <View style={styles.menu}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <TouchableOpacity
                key={item.screen}
                style={styles.menuItem}
                onPress={() => handleNavigate(item.screen)}
              >
                <Icon size={ICON_SIZES.md} color={colors.text.secondary} />
                <Text style={styles.menuText}>{item.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.logout} onPress={() => handleNavigate('logout')}>
            <LogOut size={ICON_SIZES.md} color={colors.status.warning} />
            <Text style={[styles.menuText, { color: colors.status.warning }]}>Logout</Text>
          </TouchableOpacity>
          <View style={styles.copyright}>
            <Star size={ICON_SIZES.sm - 4} color={colors.text.secondary} />
            <Text style={styles.copyrightText}> © 2025 Astro Avi</Text>
          </View>
        </View>
      </Animated.View>
    </Animated.View>
  );
});

Sidebar.displayName = 'Sidebar';

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: colors.background.overlay,
    zIndex: 999,
  },
  overlayTouchable: {
    flex: 1,
  },
  sidebar: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: SIDEBAR_WIDTH,
    height: '100%',
    backgroundColor: colors.primaryDark,
    paddingTop: 80,
    paddingHorizontal: spacing.xl,
  },
  header: {
    marginBottom: spacing.xxxl - 2,
  },
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  logoText: {
    color: colors.secondary,
    fontWeight: typography.fontWeight.semibold,
    fontSize: typography.fontSize.xl,
  },
  menu: {
    flex: 1,
    gap: spacing.md,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md - 2,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 8,
  },
  menuText: {
    color: colors.text.secondary,
    fontSize: typography.fontSize.lg,
  },
  footer: {
    marginTop: 'auto',
  },
  logout: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 50,
    alignItems: 'center',
    gap: spacing.md - 2,
  },
  copyright: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  copyrightText: {
    color: colors.text.secondary,
    fontSize: typography.fontSize.xs,
    position: 'absolute',
    bottom: 0,
  },
});

export default Sidebar;
