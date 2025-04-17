import { useQuery, useInfiniteQuery } from 'react-query';
import { getAllTransactions, getLimitTransactions } from '@/src/services/transactionService';

export function useRecentTransactions(userId: string | null) {
  return useQuery(
    ['transactions', userId],
    () => getLimitTransactions(userId || '', 5),
    {
      enabled: !!userId, // Only fetch if userId exists
    }
  );
}

export function useAllTransactions(userId: string | null) {
  return useInfiniteQuery(
    ['transactions', userId],
    ({ pageParam = 1 }) => getAllTransactions(userId || '', pageParam),
    {
      enabled: !!userId, // Only fetch if userId exists
      getNextPageParam: (lastPage, allPages) => (lastPage.length ? allPages.length + 1 : undefined),
    }
  );
}
