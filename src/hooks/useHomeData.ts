import { useState, useEffect, useCallback } from 'react';
import { categories, homeItems } from '../data/dummyData';
import { CategoryItem, HomeItem } from '../types/api.types';
import { delay } from '../utils/helpers';

export const useHomeData = () => {
  const [categoriesData, setCategoriesData] = useState<CategoryItem[]>([]);
  const [items, setItems] = useState<HomeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);

      await delay(1000);

      setCategoriesData(categories);
      setItems(homeItems);
    } catch (err) {
      setError('Failed to load data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refresh = useCallback(() => {
    fetchData(true);
  }, [fetchData]);

  return {
    categories: categoriesData,
    items,
    loading,
    refreshing,
    error,
    refresh,
  };
};
