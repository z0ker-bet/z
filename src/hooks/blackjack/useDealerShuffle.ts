import { useCallback, useEffect, useState } from 'react';
import { useAccount, useContractWrite, usePrepareContractWrite } from 'wagmi';
import { CHAIN_ID, BLACKJACK_ABI, BLACKJACK_ADDRESS } from '@contracts/index';
import { TRANSACTION_ERRORS } from '@constants/errors';
import { usePostPublicSignals } from './usePostPublicSignals';
import { setItemLocalstorage } from '@/utils';

export const useDealerShuffle = (
  gameId: number,
  resultInput: Record<string, any>
) => {
  const { address } = useAccount();
  const [loading, setLoading] = useState(false);
  const [successHash, setSuccessHash] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { postPublicSignals } = usePostPublicSignals(gameId);

  const { result, publicSignals } = resultInput || {};

  const { config } = usePrepareContractWrite({
    address: BLACKJACK_ADDRESS,
    abi: BLACKJACK_ABI,
    functionName: 'shuffleDeck',
    chainId: CHAIN_ID,
    cacheTime: 100,
    args: [result[0], result[1], result[2], result[3]],
    // overrides: {
    //   gasLimit: BigNumber.from('2000000'),
    // },
    onError(error: any) {
      if (error?.data?.code === -32000)
        setErrorMessage(TRANSACTION_ERRORS.INSUFFICIENT_FUNDS_FOR_GAS_FEE);
    },
    onSuccess() {
      setErrorMessage('');
    },
    enabled: !!address && result && result.length >= 4 && !!gameId,
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
        await postPublicSignals(publicSignals);
      } catch (error) {
        console.log('error', error);
        setErrorMessage(TRANSACTION_ERRORS.TRANSACTION_FAIL);
      }
      setLoading(false);
    }
  }, [data, publicSignals]);

  useEffect(() => {
    if (data?.hash) {
      setItemLocalstorage(
        `${address?.toLowerCase()}_${gameId}`,
        JSON.stringify(publicSignals)
      );
      awaitTxs();
    }
  }, [data]);

  const dealerShuffle = useCallback(async () => {
    if (address && write) {
      console.log('==START DEALER SHUFFLER');
      setSuccessHash('');
      write();
    }
  }, [write && address]);

  return {
    data,
    isLoading: isLoading || loading,
    isSuccess,
    dealerShuffle,
    errorMessage,
    isError,
    successHash,
  };
};
