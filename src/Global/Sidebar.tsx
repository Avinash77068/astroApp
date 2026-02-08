import React, { useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Animated, StyleSheet, Dimensions } from "react-native";
import { Home, Phone, MessageCircle, Video, User, LogOut, Moon, Star } from "lucide-react-native";

interface SidebarProps {
  onNavigate: (screen: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const SIDEBAR_WIDTH = 260;

const Sidebar: React.FC<SidebarProps> = ({ onNavigate, isOpen, onClose }) => {
  const slideAnim = useRef(new Animated.Value(-SIDEBAR_WIDTH)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: isOpen ? 0 : -SIDEBAR_WIDTH,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(overlayOpacity, {
        toValue: isOpen ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isOpen]);

  const handleNavigate = (screen: string) => {
    onNavigate(screen);
    onClose();
  };

  return (
    <Animated.View
      style={[styles.overlay, { opacity: overlayOpacity }]}
      pointerEvents={isOpen ? "auto" : "none"}
    >
      <TouchableOpacity style={styles.overlayTouchable} onPress={onClose} activeOpacity={1} />
      <Animated.View style={[styles.sidebar, { transform: [{ translateX: slideAnim }] }]}>
        <View style={styles.header}>
          <View style={styles.logo}>
            <Moon size={26} color="#FFD369" />
            <Text style={styles.logoText}>Astro Avi</Text>
          </View>
        </View>

        <View style={styles.menu}>
          <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigate("splash")}>
            <Home size={20} color="#ddd" />
            <Text style={styles.menuText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigate("call")}>
            <Phone size={20} color="#ddd" />
            <Text style={styles.menuText}>Call</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigate("chat-list")}>
            <MessageCircle size={20} color="#ddd" />
            <Text style={styles.menuText}>Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigate("live")}>
            <Video size={20} color="#ddd" />
            <Text style={styles.menuText}>Live</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigate("profile")}>
            <User size={20} color="#ddd" />
            <Text style={styles.menuText}>Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.logout} onPress={() => handleNavigate("logout")}>
            <LogOut size={20} color="#ff7675" />
            <Text style={[styles.menuText, { color: "#ff7675" }]}>Logout</Text>
          </TouchableOpacity>
          <View style={styles.copyright}>
            <Star size={14} color="#ddd" />
            <Text style={{ color: "#ddd", fontSize: 12,position: "absolute",bottom: 0 }}> © 2025 Astro Avi</Text>
          </View>
        </View>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    zIndex: 999,
  },
  overlayTouchable: {
    flex: 1,
  },
  sidebar: {
    position: "absolute",
    left: 0,
    top: 0,
    width: SIDEBAR_WIDTH,
    height: "100%",
    backgroundColor: "#6a1b9a",
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  header: {
    marginBottom: 30,
  },
  logo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  logoText: {
    color: "#FFD369",
    fontWeight: "600",
    fontSize: 18,
  },
  menu: {
    flex: 1,
    gap: 12,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  menuText: {
    color: "#ddd",
    fontSize: 16,
  },
  footer: {
    marginTop: "auto",
  },
  logout: {
    flexDirection: "row",
    position: "absolute",
    bottom: 50,
    alignItems: "center",
  },
  copyright: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Sidebar;
