import { useCallback, useEffect } from 'react';
import { useContractRead } from 'wagmi';
import { BLACKJACK_ABI, BLACKJACK_ADDRESS, CHAIN_ID } from '@contracts/index';

export const useGetDealerDecrypteds = (gameId: number) => {
  const { data, isError, isLoading, refetch } = useContractRead({
    address: BLACKJACK_ADDRESS,
    abi: BLACKJACK_ABI,
    functionName: 'getDealerDecrypteds',
    args: [gameId],
    chainId: CHAIN_ID,
    cacheTime: 100,
    enabled: !!gameId,
  });

  const getDealerDecrypteds = useCallback(async () => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (gameId) {
      getDealerDecrypteds();
    }
  }, [gameId]);

  // const dataDeck: number = useMemo(() => {
  //   if (!data) return 0;
  //   return data.toNumber();
  // }, [data]);

  return {
    getDealerDecrypteds,
    dataDealerDecrypteds: data,
    isError,
    isLoading,
  };
};
