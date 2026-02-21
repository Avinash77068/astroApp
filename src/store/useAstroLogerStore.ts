
import { create } from 'zustand';


interface AstroLogerState {
    astroLogerData: any | null;
    isLoading: boolean;
    isError: boolean;
    setAstroLogerData: (data: any) => void;
    setIsLoading: (isLoading: boolean) => void;
    setIsError: (isError: boolean) => void;
}

export const useAstroLogerStore = create<AstroLogerState>((set) => ({
    astroLogerData: null,
    isLoading: false,
    isError: false,
    setAstroLogerData: (data:any) => set({ astroLogerData: data }),
    setIsLoading: (isLoading:boolean) => set({ isLoading }),
    setIsError: (isError:boolean) => set({ isError }),
}));