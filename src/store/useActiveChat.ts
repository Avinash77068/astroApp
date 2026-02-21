import { create } from 'zustand';

interface ActiveChatState {
  activeChat: string | null | any;
  setActiveChat: (chatId: string) => void;
}

export const useActiveChat = create<ActiveChatState>((set) => ({
  activeChat: null,
  setActiveChat: (chatId: string) => set({ activeChat: chatId }),
}));