import { create } from 'zustand';
import SidebarState from '../types/SidebarState';

const useSidebar = create<SidebarState>(set => ({
  isSidebarOpen: false,
  unreadNotifications: 0,
  openSidebar: () => set({ isSidebarOpen: true }),
  closeSidebar: () => set({ isSidebarOpen: false }),
  toggleSidebar: () => set(state => ({ isSidebarOpen: !state.isSidebarOpen })),
  setUnreadNotifications: count => set({ unreadNotifications: count }),
  isSettingsOpen: false,
  openSettings: () => set({ isSettingsOpen: true }),
  closeSettings: () => set({ isSettingsOpen: false }),
  toggleSettings: () =>
    set(state => ({ isSettingsOpen: !state.isSettingsOpen })),
  isSearchOpen: false,
  openSearch: () => set({ isSearchOpen: true }),
  closeSearch: () => set({ isSearchOpen: false }),
  toggleSearch: () => set(state => ({ isSearchOpen: !state.isSearchOpen })),
}));

export default useSidebar;
