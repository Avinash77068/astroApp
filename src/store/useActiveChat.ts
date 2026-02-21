import { create } from 'zustand';

interface Astrologer {
  id: string;
  name: string;
  image: string;
  expertise: string;
  experience: string;
  price: string;
  isOnline: boolean;
  isLive: boolean;
}

interface ActiveChatState {
  activeChat: Astrologer | null;
  setActiveChat: (astrologer: Astrologer) => void;
  clearActiveChat: () => void;
}

export const useActiveChat = create<ActiveChatState>((set) => ({
  activeChat: null,
  setActiveChat: (astrologer: Astrologer) => set({ activeChat: astrologer }),
  clearActiveChat: () => set({ activeChat: null }),
}));