import React from 'react';
import { useDealerDealDouble } from '@/hooks/blackjack/useDealerDealDouble';
import PrimaryButton from '@/components/atoms/buttons/PrimaryButton';

type DealerDealDoubleBtnType = {
  resultInput: Record<string, any>;
  gameId: number;
  cardIndex: number;
};

const DealerDealDoubleBtn: React.FC<DealerDealDoubleBtnType> = ({
  resultInput,
  gameId,
  cardIndex,
}) => {
  const {
    dealerDealDouble,
    // data,
    isLoading,
    // isSuccess,
    // errorMessage,
    // isError,
    // successHash,
  } = useDealerDealDouble(gameId, resultInput, cardIndex);

  return (
    <PrimaryButton onClick={dealerDealDouble} loading={isLoading}>
      Approve
    </PrimaryButton>
  );
};

export default DealerDealDoubleBtn;
