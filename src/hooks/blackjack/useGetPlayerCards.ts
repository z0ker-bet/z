import { useCallback, useEffect, useMemo } from 'react';
import { useContractRead } from 'wagmi';
import { BLACKJACK_ABI, BLACKJACK_ADDRESS, CHAIN_ID } from '@contracts/index';

export const useGetPlayerCards = (gameId: number) => {
  const { data, isError, isLoading, refetch } = useContractRead({
    address: BLACKJACK_ADDRESS,
    abi: BLACKJACK_ABI,
    functionName: 'getPlayerCards',
    args: [gameId],
    chainId: CHAIN_ID,
    cacheTime: 100,
    enabled: !!gameId,
  });

  const getPlayerCards = useCallback(async () => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (gameId) {
      getPlayerCards();
    }
  }, [gameId]);

  const dataPlayerCards: number[] = useMemo(() => {
    if (!data) return [];
    const valueData: any = data;
    return valueData.map((item: any) => item.toNumber());
  }, [data]);

  return { getPlayerCards, dataPlayerCards, isError, isLoading };
};
