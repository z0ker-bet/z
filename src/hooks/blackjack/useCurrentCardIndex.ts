import { useCallback, useEffect, useMemo } from 'react';
import { useContractRead } from 'wagmi';
import { BLACKJACK_ABI, BLACKJACK_ADDRESS, CHAIN_ID } from '@contracts/index';

export const useCurrentCardIndex = (gameId: number) => {
  const { data, isError, isLoading, refetch } = useContractRead({
    address: BLACKJACK_ADDRESS,
    abi: BLACKJACK_ABI,
    functionName: 'getIndex',
    args: [gameId],
    chainId: CHAIN_ID,
    cacheTime: 100,
    enabled: !!gameId,
  });

  const getCurrentIndex = useCallback(async () => {
    setTimeout(() => {
      refetch();
    }, 500);
  }, []);

  useEffect(() => {
    getCurrentIndex();
  }, [gameId]);

  const dataCurrentCardIndex: number = useMemo(() => {
    if (!data) return 0;
    const dataValue: any = data;
    return dataValue;
  }, [data]);

  return { getCurrentIndex, dataCurrentCardIndex, isError, isLoading };
};
