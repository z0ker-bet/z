import React from 'react';
import { useUserHitCard } from '@/hooks/blackjack/useUserHitCard';
import PrimaryButton from '@/components/atoms/buttons/PrimaryButton';

type PlayerHitCardBtnType = {
  resultInput: Record<string, any>;
  gameId: number;
};

const PlayerHitCardBtn: React.FC<PlayerHitCardBtnType> = ({
  resultInput,
  gameId,
}) => {
  const {
    userHitCard,
    // data,
    isLoading,
    // isSuccess,
    // errorMessage,
    // isError,
    // successHash,
  } = useUserHitCard(gameId, resultInput);

  return (
    <PrimaryButton onClick={userHitCard} loading={isLoading}>
      Hit Card
    </PrimaryButton>
  );
};

export default PlayerHitCardBtn;
