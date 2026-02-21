import { create } from 'zustand';
import { activeUser } from '../component/screen/HomeScreen/astrologerList/types';

interface ActiveChatState {
  activeChat: activeUser | null;
  setActiveChat: (astrologer: activeUser) => void;
  clearActiveChat: () => void;
}

export const useActiveChat = create<ActiveChatState>((set) => ({
  activeChat: null,
  setActiveChat: (astrologer: activeUser) => set({ activeChat: astrologer }),
  clearActiveChat: () => set({ activeChat: null }),
}));