import { useCallback, useEffect, useMemo } from 'react';
import { useContractRead } from 'wagmi';
import { BLACKJACK_ABI, BLACKJACK_ADDRESS, CHAIN_ID } from '@contracts/index';

export const useGetDealerCards = (gameId: number) => {
  const { data, isError, isLoading, refetch } = useContractRead({
    address: BLACKJACK_ADDRESS,
    abi: BLACKJACK_ABI,
    functionName: 'getDealerCards',
    args: [gameId],
    chainId: CHAIN_ID,
    cacheTime: 100,
    enabled: !!gameId,
  });

  const getDealerCards = useCallback(async () => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (gameId) {
      getDealerCards();
    }
  }, [gameId]);

  const dataDealerCards: number[] = useMemo(() => {
    if (!data) return [];
    const valueData: any = data;
    return valueData.map((item: any) => item.toNumber());
  }, [data]);

  return { getDealerCards, dataDealerCards, isError, isLoading };
};
