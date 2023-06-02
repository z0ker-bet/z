import { useCallback, useEffect, useState } from 'react';
import { useAccount, useContractWrite, usePrepareContractWrite } from 'wagmi';
import { CHAIN_ID, BLACKJACK_ABI, BLACKJACK_ADDRESS } from '@contracts/index';
import { ethers } from 'ethers';
import { STARTING_DECK } from '@/utils/blackjack';
// import { DEFAULT_VALUE_BET } from '@/constants/blackjack';
import { TRANSACTION_ERRORS } from '@/constants/errors';
// import { BigNumber } from 'ethers';

export const useCreateNewGame = (betPrice: number) => {
  const [loading, setLoading] = useState(false);
  const [successHash, setSuccessHash] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { address } = useAccount();
  const { config, refetch } = usePrepareContractWrite({
    address: BLACKJACK_ADDRESS,
    abi: BLACKJACK_ABI,
    functionName: 'startNewGame',
    chainId: CHAIN_ID,
    cacheTime: 1000,
    args: [STARTING_DECK, ethers.utils.parseEther(`${betPrice}`)],
    overrides: {
      value: ethers.utils.parseEther(`${+betPrice * 2}`),
      from: address,
      // gasLimit: BigNumber.from('2000000'),
    },
    onError(error: any) {
      if (error?.data?.code === -32000)
        setErrorMessage(TRANSACTION_ERRORS.INSUFFICIENT_FUNDS_FOR_GAS_FEE);
    },
    onSuccess() {
      setErrorMessage('');
    },
    enabled: !!address && betPrice > 0,
  });

  const { data, isLoading, isSuccess, write, isError } = useContractWrite(
    config
  );

  const awaitTxs = useCallback(async () => {
    if (data) {
      setLoading(true);
      try {
        await data.wait();
        setSuccessHash(data.hash);
      } catch (error) {
        console.log('error', error);
        setErrorMessage(TRANSACTION_ERRORS.TRANSACTION_FAIL);
      }
      setLoading(false);
    }
  }, [data]);

  useEffect(() => {
    if (data?.hash) {
      awaitTxs();
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, [refetch, betPrice]);

  const createNewGame = useCallback(async () => {
    console.log('==START NEW GAME');
    if (address && write) {
      setSuccessHash('');
      write();
    }
  }, [write && address]);

  return {
    data,
    isLoading: isLoading || loading,
    isSuccess,
    createNewGame,
    errorMessage,
    isError,
    successHash,
  };
};
