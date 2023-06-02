import React from 'react';
import { useDealerHitCard } from '@/hooks/blackjack/useDealerHitCard';
import PrimaryButton from '@/components/atoms/buttons/PrimaryButton';

type DealerHitCardBtnType = {
  resultInput: Record<string, any>;
  gameId: number;
  cardIndex: number;
};

const DealerHitCardBtn: React.FC<DealerHitCardBtnType> = ({
  resultInput,
  gameId,
  cardIndex,
}) => {
  const {
    dealerHitCard,
    // data,
    isLoading,
    // isSuccess,
    // errorMessage,
    // isError,
    // successHash,
  } = useDealerHitCard(gameId, resultInput, cardIndex);

  return (
    <PrimaryButton onClick={dealerHitCard} loading={isLoading}>
      Hit Card
    </PrimaryButton>
  );
};

export default DealerHitCardBtn;
