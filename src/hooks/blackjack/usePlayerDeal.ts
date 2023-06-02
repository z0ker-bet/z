import { useCallback, useEffect, useState } from 'react';
import { useAccount, useContractWrite, usePrepareContractWrite } from 'wagmi';
import { CHAIN_ID, BLACKJACK_ABI, BLACKJACK_ADDRESS } from '@contracts/index';
// import { ethers } from 'ethers';
// import { DEFAULT_VALUE_BET } from '@constants/blackjack';
import { TRANSACTION_ERRORS } from '@constants/errors';
// import { BigNumber } from 'ethers';

export const usePlayerDeal = (
  gameId: number,
  resultInput: Record<string, any>
) => {
  const { address } = useAccount();
  const [loading, setLoading] = useState(false);
  const [successHash, setSuccessHash] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { result } = resultInput || {};

  const { config } = usePrepareContractWrite({
    address: BLACKJACK_ADDRESS,
    abi: BLACKJACK_ABI,
    functionName: 'deal4',
    chainId: CHAIN_ID,
    cacheTime: 100,
    args: [gameId, result[0], result[1], result[2], result[3]],
    // overrides: {
    //   from: address,
    //   value: ethers.utils.parseEther(`${DEFAULT_VALUE_BET * 2}`),
    //   gasLimit: BigNumber.from('10000000'),
    // },
    onError(error: any) {
      if (error?.data?.code === -32000)
        setErrorMessage(TRANSACTION_ERRORS.INSUFFICIENT_FUNDS_FOR_GAS_FEE);
    },
    onSuccess() {
      setErrorMessage('');
    },
    // enabled: !!address && resultInput && resultInput.length >= 4 && !!gameId,
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

  const playerDeal = useCallback(async () => {
    if (address && write) {
      console.log('==START PLAYER DEAL: ', gameId);
      setSuccessHash('');
      write();
    }
  }, [write, address, gameId]);

  return {
    data,
    isLoading: isLoading || loading,
    isSuccess,
    playerDeal,
    errorMessage,
    isError,
    successHash,
  };
};
