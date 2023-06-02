import { useContractRead } from 'wagmi';
import { BLACKJACK_ABI, BLACKJACK_ADDRESS, CHAIN_ID } from '@contracts/index';
import { useCallback, useMemo } from 'react';
import { ADDRESS_TYPE } from '@/constants/types';

export const useGetCurrentInBoard = (address: ADDRESS_TYPE | undefined) => {
  const { data, isError, isLoading, refetch } = useContractRead({
    address: BLACKJACK_ADDRESS,
    abi: BLACKJACK_ABI,
    functionName: 'getBoardIdFromAddress',
    args: [address],
    chainId: CHAIN_ID,
    cacheTime: 100,
    enabled: !!address,
  });

  const getCurrentInBoard: () => void = useCallback(async () => {
    refetch();
  }, [refetch]);

  // useEffect(() => {
  //   getDeck();
  // }, []);

  const dataCurrentInBoard: number = useMemo(() => {
    if (!data) return 0;
    const dateValue: any = data;
    return dateValue.toNumber();
  }, [data]);

  return { getCurrentInBoard, dataCurrentInBoard, isError, isLoading };
};
