import React from 'react';
import { useDealHit } from '@/hooks/blackjack/useDealHit';
import PrimaryButton from '@/components/atoms/buttons/PrimaryButton';

type DealHitBtnType = {
  resultInput: Record<string, any>;
  gameId: number;
  cardIndex: number;
};

const DealHitBtn: React.FC<DealHitBtnType> = ({
  resultInput,
  gameId,
  cardIndex,
}) => {
  const {
    dealHit,
    // data,
    isLoading,
    // isSuccess,
    // errorMessage,
    // isError,
    // successHash,
  } = useDealHit(gameId, resultInput, cardIndex);

  return (
    <PrimaryButton onClick={dealHit} loading={isLoading}>
      Approve
    </PrimaryButton>
  );
};

export default DealHitBtn;
