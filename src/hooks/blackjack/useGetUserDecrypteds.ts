import { useCallback, useEffect } from 'react';
import { useContractRead } from 'wagmi';
import { BLACKJACK_ABI, BLACKJACK_ADDRESS, CHAIN_ID } from '@contracts/index';

export const useGetUserDecrypteds = (gameId: number) => {
  const { data, isError, isLoading, refetch } = useContractRead({
    address: BLACKJACK_ADDRESS,
    abi: BLACKJACK_ABI,
    functionName: 'getUserDecrypteds',
    args: [gameId],
    chainId: CHAIN_ID,
    cacheTime: 100,
    enabled: !!gameId,
  });

  const getUserDecrypteds = useCallback(async () => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (gameId) {
      getUserDecrypteds();
    }
  }, [gameId]);

  // const dataDeck: number = useMemo(() => {
  //   if (!data) return 0;
  //   return data.toNumber();
  // }, [data]);

  return { getUserDecrypteds, dataUserDecrypteds: data, isError, isLoading };
};
