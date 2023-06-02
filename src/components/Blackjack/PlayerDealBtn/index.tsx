import React from 'react';
import { usePlayerDeal } from '@/hooks/blackjack/usePlayerDeal';
import PrimaryButton from '@/components/atoms/buttons/PrimaryButton';

type PlayerDealBtnType = {
  resultInput: Record<string, any>;
  gameId: number;
};

const PlayerDealBtn: React.FC<PlayerDealBtnType> = ({
  resultInput,
  gameId,
}) => {
  const {
    playerDeal,
    // data,
    isLoading,
    // isSuccess,
    // errorMessage,
    // isError,
    // successHash,
  } = usePlayerDeal(gameId, resultInput);

  return (
    <PrimaryButton onClick={playerDeal} loading={isLoading}>
      Deal
    </PrimaryButton>
  );
};

export default PlayerDealBtn;
