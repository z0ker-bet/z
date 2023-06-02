import React from 'react';
import { useDealerDeal } from '@/hooks/blackjack/useDealerDeal';
import PrimaryButton from '@/components/atoms/buttons/PrimaryButton';

type DealerDealBtnType = {
  resultInput: Record<string, any>;
  gameId: number;
};

const DealerDealBtn: React.FC<DealerDealBtnType> = ({
  resultInput,
  gameId,
}) => {
  const {
    dealerDeal,
    // data,
    isLoading,
    // isSuccess,
    // errorMessage,
    // isError,
    // successHash,
  } = useDealerDeal(gameId, resultInput);

  return (
    <PrimaryButton onClick={dealerDeal} loading={isLoading}>
      Approve
    </PrimaryButton>
  );
};

export default DealerDealBtn;
