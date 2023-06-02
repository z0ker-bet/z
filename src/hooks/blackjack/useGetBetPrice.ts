import { useContractRead } from 'wagmi';
import { BLACKJACK_ABI, BLACKJACK_ADDRESS, CHAIN_ID } from '@contracts/index';
import { useMemo } from 'react';
import { ethers } from 'ethers';

export const useGetBetPrice = () => {
  const { data, isError, isLoading } = useContractRead({
    address: BLACKJACK_ADDRESS,
    abi: BLACKJACK_ABI,
    functionName: 'betPrice',
    args: [],
    chainId: CHAIN_ID,
    cacheTime: 100,
  });

  // const getDeck = useCallback(async () => {
  //   refetch();
  // }, [refetch]);

  // useEffect(() => {
  //   getDeck();
  // }, []);

  const dataBetPrice: number = useMemo(() => {
    if (!data) return 0;
    const dataValue: any = data;
    return +ethers.utils.formatUnits(dataValue);
  }, [data]);

  return { dataBetPrice, isError, isLoading };
};
