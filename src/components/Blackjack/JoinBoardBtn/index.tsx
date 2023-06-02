import React, { useCallback, useMemo } from 'react';
import { useJoinBoardAndShuffleDeck } from '@/hooks/blackjack/useJoinBoardAndShuffleDeck';
import PrimaryButton from '@/components/atoms/buttons/PrimaryButton';
import { useNotification } from '@/hooks/useNotification';
import { useAccount, useBalance } from 'wagmi';

type JoinBoardBtnType = {
  resultInput: Record<string, any>;
  gameId: number;
  betPrice: number;
};

const JoinBoardBtn: React.FC<JoinBoardBtnType> = ({
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
    joinBoardAndShuffleDeck,
    // data,
    isLoading,
    // isSuccess,
    // errorMessage,
    // isError,
    // successHash,
  } = useJoinBoardAndShuffleDeck(gameId, resultInput, betPrice);

  const handleClick = useCallback(() => {
    if (!isEnoughBalance) {
      openNotification({
        type: 'error',
        message: 'Error Join game',
        description: 'Wallet Balance is not enough.',
      });
    } else {
      joinBoardAndShuffleDeck();
    }
  }, [isEnoughBalance, joinBoardAndShuffleDeck]);

  return (
    <>
      {contextHolder}
      <PrimaryButton onClick={handleClick} loading={isLoading}>
        Join and Shuffle
      </PrimaryButton>
    </>
  );
};

export default JoinBoardBtn;
