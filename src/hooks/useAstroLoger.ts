import { useQuery } from '@tanstack/react-query';
import { astroLoger } from '../app/services';
import { useEffect } from 'react';
import { useAstroLogerStore } from '../store/useAstroLogerStore';

export const useAstroLoger = () => {
  const setAstroLogerData = useAstroLogerStore((state: any) => state.setAstroLogerData);
  const query = useQuery({
    queryKey: ['astrologer'],
    // api call
    queryFn: () => astroLoger({ endpoint: '/astrologer' }),
    // enable query
    enabled: true,
    // ✅ 5 minutes tak fresh mana jayega
    staleTime: 1000 * 60 * 5,
    // ✅ Cache memory me 10 minutes rahega
    gcTime: 1000 * 60 * 10, // (v5 me gcTime hota hai)
    // 🔄 Refetch options
    refetchOnMount: false,
    // 🔄 Refetch when window regains focus
    refetchOnWindowFocus: false,
    // 🔄 Refetch when network reconnects
    refetchOnReconnect: false,
  });
  useEffect(() => {
    if (query?.data) {
      setAstroLogerData(query?.data.data);
    }
  }, [query, setAstroLogerData]);
  return query;
};
export { useAstroLogerStore };

