import { useQuery } from '@tanstack/react-query';
import { astroLoger } from '../app/services';
import { useEffect } from 'react';
import { useAstroLogerStore } from '../store/useAstroLogerStore';

export const useAstroLoger = () => {
  const setAstroLogerData = useAstroLogerStore(
    (state: any) => state.setAstroLogerData,
  );
  const query = useQuery({
    queryKey: ['astrologer'],
    queryFn: () => astroLoger({ endpoint: '/astrologer' }),
    enabled: true,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
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
