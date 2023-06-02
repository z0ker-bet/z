import React from 'react';
import { useDealerShuffle } from '@/hooks/blackjack/useDealerShuffle';
import PrimaryButton from '@/components/atoms/buttons/PrimaryButton';

type DealerShuffleBtnType = {
  resultInput: Record<string, any>;
  gameId: number;
};

const DealerShuffleBtn: React.FC<DealerShuffleBtnType> = ({
  gameId,
  resultInput,
}) => {
  const {
    dealerShuffle,
    // data,
    isLoading,
    // isSuccess,
    // errorMessage,
    // isError,
    // successHash,
  } = useDealerShuffle(gameId, resultInput);

  return (
    <PrimaryButton onClick={dealerShuffle} loading={isLoading}>
      Shuffle
    </PrimaryButton>
  );
};

export default DealerShuffleBtn;
