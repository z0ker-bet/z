import React from 'react';
import { useDealerOpenHidden } from '@/hooks/blackjack/useDealerOpenHidden';
import PrimaryButton from '@/components/atoms/buttons/PrimaryButton';

type DealerOpenHiddenBtnType = {
  resultInput: Record<string, any>;
  gameId: number;
};

const DealerOpenHiddenBtn: React.FC<DealerOpenHiddenBtnType> = ({
  resultInput,
  gameId,
}) => {
  const {
    dealerOpenHidden,
    // data,
    isLoading,
    // isSuccess,
    // errorMessage,
    // isError,
    // successHash,
  } = useDealerOpenHidden(gameId, resultInput);

  return (
    <PrimaryButton onClick={dealerOpenHidden} loading={isLoading}>
      Reveal Card
    </PrimaryButton>
  );
};

export default DealerOpenHiddenBtn;
