import React, { useCallback, useMemo } from 'react';
import { useUserDouble } from '@/hooks/blackjack/useUserDouble';
import PrimaryButton from '@/components/atoms/buttons/PrimaryButton';
import { useNotification } from '@/hooks/useNotification';
import { useAccount, useBalance } from 'wagmi';

type PlayerDoubleBtnType = {
  resultInput: Record<string, any>;
  gameId: number;
  betPrice: number;
};

const PlayerDoubleBtn: React.FC<PlayerDoubleBtnType> = ({
  resultInput,
  gameId,
  betPrice,
}) => {
  const { openNotification, contextHolder } = useNotification();
  const { address } = useAccount();
  const { data } = useBalance({ address });

  const isEnoughBalance = useMemo(() => {
    return data?.formatted && +data?.formatted > betPrice;
  }, [data?.formatted, betPrice]);

  const {
    userDouble,
    // data,
    isLoading,
    // isSuccess,
    // errorMessage,
    // isError,
    // successHash,
  } = useUserDouble(gameId, resultInput, betPrice);

  const handleClick = useCallback(() => {
    if (!isEnoughBalance) {
      openNotification({
        type: 'error',
        message: 'Error Join game',
        description: 'Wallet Balance is not enough.',
      });
    } else {
      userDouble();
    }
  }, [isEnoughBalance, userDouble]);

  return (
    <>
      {contextHolder}

      <PrimaryButton onClick={handleClick} loading={isLoading}>
        Double
      </PrimaryButton>
    </>
  );
};

export default PlayerDoubleBtn;
