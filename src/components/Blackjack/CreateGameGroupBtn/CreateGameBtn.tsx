import React, { useCallback, useEffect, useMemo } from 'react';
import { useCreateNewGame } from '@/hooks/blackjack/useCreateNewGame';
import PrimaryButton from '@/components/atoms/buttons/PrimaryButton';
import { useAccount, useBalance } from 'wagmi';
import { useNotification } from '@/hooks/useNotification';

type CreateGameBtnType = {
  onFinish?: () => void;
  className?: string;
  classNameBtn?: string;
  betPrice: number;
};

const CreateGameBtn: React.FC<CreateGameBtnType> = ({
  onFinish,
  classNameBtn,
  betPrice,
}) => {
  const { address } = useAccount();
  const { data } = useBalance({ address });
  const { openNotification, contextHolder } = useNotification();

  const isEnoughBalance = useMemo(() => {
    return data?.formatted && +data?.formatted > betPrice * 2;
  }, [data?.formatted, betPrice]);

  const {
    createNewGame,
    // data,
    isLoading,
    // isSuccess,
    // errorMessage,
    // isError,
    successHash,
  } = useCreateNewGame(betPrice);

  useEffect(() => {
    if (successHash && onFinish) {
      onFinish();
    }
  }, [successHash]);

  const handleCreateNewGame = useCallback(() => {
    if (!isEnoughBalance) {
      openNotification({
        type: 'error',
        message: 'Error Create New Game',
        description: 'Wallet Balance is not enough.',
      });
    } else {
      createNewGame();
    }
  }, [isEnoughBalance, createNewGame]);

  return (
    <>
      {contextHolder}
      <PrimaryButton
        onClick={handleCreateNewGame}
        loading={isLoading}
        className={classNameBtn}
      >
        Create New Game
      </PrimaryButton>
    </>
  );
};

export default CreateGameBtn;
