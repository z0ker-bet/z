import { useContractRead } from 'wagmi';
import { BLACKJACK_ABI, BLACKJACK_ADDRESS, CHAIN_ID } from '@contracts/index';
import { useCallback, useMemo } from 'react';

export const useGetBoardIndexCounter = () => {
  const { data, isError, isLoading, refetch } = useContractRead({
    address: BLACKJACK_ADDRESS,
    abi: BLACKJACK_ABI,
    functionName: 'boardCounter',
    args: [],
    chainId: CHAIN_ID,
    cacheTime: 100,
  });

  const getBoardIndexCounter: () => void = useCallback(async () => {
    refetch();
  }, [refetch]);

  const dataBoardIndexCounter: number = useMemo(() => {
    if (!data) return 0;
    const dataValue: any = data;
    return dataValue.toNumber();
  }, [data]);

  return { getBoardIndexCounter, dataBoardIndexCounter, isError, isLoading };
};
