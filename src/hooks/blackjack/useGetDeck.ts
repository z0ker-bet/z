import { useCallback, useEffect } from 'react';
import { useContractRead } from 'wagmi';
import { BLACKJACK_ABI, BLACKJACK_ADDRESS, CHAIN_ID } from '@contracts/index';

export const useGetDeck = (gameId: number) => {
  const { data, isError, isLoading, refetch } = useContractRead({
    address: BLACKJACK_ADDRESS,
    abi: BLACKJACK_ABI,
    functionName: 'getDeck',
    args: [gameId],
    chainId: CHAIN_ID,
    cacheTime: 100,
    enabled: !!gameId,
  });

  const getDeck = useCallback(async () => {
    refetch();
  }, []);

  useEffect(() => {
    if (gameId) {
      getDeck();
    }
  }, [gameId]);

  // const dataDeck: number = useMemo(() => {
  //   if (!data) return 0;
  //   return data.toNumber();
  // }, [data]);

  return { getDeck, dataDeck: data, isError, isLoading };
};
