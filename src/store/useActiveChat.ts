import { create } from 'zustand';
import { activeUser } from '../component/screen/HomeScreen/astrologerList/types';

interface ActiveChatState {
  activeChat: activeUser | null;
  setActiveChat: (astrologer: activeUser) => void;
  clearActiveChat: () => void;
  phoneCallEnabled: boolean;
  videoCallEnabled: boolean;
  setPhoneCallEnabled: (enabled: boolean) => void;
  setVideoCallEnabled: (enabled: boolean) => void;
}

export const useActiveChat = create<ActiveChatState>((set) => ({
  activeChat: null,
  phoneCallEnabled: false,
  videoCallEnabled: false,
  setActiveChat: (astrologer: activeUser) => set({ activeChat: astrologer }),
  clearActiveChat: () => set({ activeChat: null }),
  setPhoneCallEnabled: (enabled: boolean) => set({ phoneCallEnabled: enabled }),
  setVideoCallEnabled: (enabled: boolean) => set({ videoCallEnabled: enabled }),
}));