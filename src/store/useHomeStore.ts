import { create } from 'zustand';
// Properly typed Zustand store
interface HomepageState {
  data: any | null;
  isLoading: boolean;
  isError: boolean;
  setData: (data: any) => void;
  setIsLoading: (isLoading: boolean) => void;
  setIsError: (isError: boolean) => void;
}

export const useHomepageStore = create<HomepageState>(set => ({
  data: null,
  isLoading: false,
  isError: false,
  setData: (data: any) => set({ data }),
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
  setIsError: (isError: boolean) => set({ isError }),
}));
