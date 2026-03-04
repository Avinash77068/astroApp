import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { fetchHomepage } from '../app/services';
import { useHomepageStore } from '../store/useHomeStore';

export const useHomepage = () => {
  const setData = useHomepageStore((state: any) => state.setData);

  const query = useQuery({
    queryKey: ['homepage'],
    queryFn: () => fetchHomepage({ endpoint: '/homepage' }),
    enabled: true,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  useEffect(() => {
    if (query.data) {
      setData(query.data);
    }
  }, [query.data, setData]);

  return query;
};

export { useHomepageStore };
