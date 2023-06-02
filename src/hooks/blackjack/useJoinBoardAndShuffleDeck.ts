import { useCallback, useEffect, useState } from 'react';
import { useAccount, useContractWrite, usePrepareContractWrite } from 'wagmi';
import { CHAIN_ID, BLACKJACK_ABI, BLACKJACK_ADDRESS } from '@contracts/index';
import { ethers } from 'ethers';
import { DEFAULT_VALUE_BET } from '@constants/blackjack';
import { TRANSACTION_ERRORS } from '@constants/errors';
import { usePostPublicSignals } from './usePostPublicSignals';
import { setItemLocalstorage } from '@/utils';
// import { BigNumber } from 'ethers';

export const useJoinBoardAndShuffleDeck = (
  gameId: number,
  resultInput: Record<string, any>,
  betPrice: number
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
    functionName: 'joinBoardAndShuffleDeck',
    chainId: CHAIN_ID,
    cacheTime: 100,
    args: [gameId, result[0], result[1], result[2], result[3]],
    overrides: {
      from: address,
      value: ethers.utils.parseEther(`${betPrice || DEFAULT_VALUE_BET}`),
      // gasLimit: BigNumber.from('10000000'),
    },
    onError(error: any) {
      if (error?.data?.code === -32000)
        setErrorMessage(TRANSACTION_ERRORS.INSUFFICIENT_FUNDS_FOR_GAS_FEE);
    },
    onSuccess() {
      setErrorMessage('');
    },
    enabled: !!address && betPrice > 0 && !!gameId,
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

  const joinBoardAndShuffleDeck = useCallback(async () => {
    if (address && write) {
      console.log('==START JOIN BOARD AND SHUFFLER: ', gameId);
      setSuccessHash('');
      write();
    }
  }, [write, address, gameId]);

  return {
    data,
    isLoading: isLoading || loading,
    isSuccess,
    joinBoardAndShuffleDeck,
    errorMessage,
    isError,
    successHash,
  };
};
