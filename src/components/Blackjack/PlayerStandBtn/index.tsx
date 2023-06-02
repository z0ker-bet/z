import React from 'react';
import { useUserStand } from '@/hooks/blackjack/useUserStand';
import PrimaryButton from '@/components/atoms/buttons/PrimaryButton';

type PlayerStandBtnType = {
  resultInput: Record<string, any>;
  gameId: number;
};

const PlayerStandBtn: React.FC<PlayerStandBtnType> = ({
  resultInput,
  gameId,
}) => {
  const {
    userStand,
    // data,
    isLoading,
    // isSuccess,
    // errorMessage,
    // isError,
    // successHash,
  } = useUserStand(gameId, resultInput);

  return (
    <PrimaryButton onClick={userStand} loading={isLoading}>
      Stand
    </PrimaryButton>
  );
};

export default PlayerStandBtn;
