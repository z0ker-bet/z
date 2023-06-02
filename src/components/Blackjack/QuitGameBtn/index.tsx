import React, { useEffect } from 'react';
import SecondaryButton from '@/components/atoms/buttons/SecondaryButton';
import { useQuitGame } from '@/hooks/blackjack/useQuitGame';
import { useNavigate } from 'react-router-dom';
import { ROUTES_NAMES } from '@/router/router';
import QuitIcon from '@assets/images/icons/quit.svg';

type QuitGameBtnType = {
  gameId: number;
};

const QuitGameBtn: React.FC<QuitGameBtnType> = ({ gameId }) => {
  const {
    quitGame,
    // data,
    isLoading,
    // isSuccess,
    // errorMessage,
    // isError,
    successHash,
  } = useQuitGame(gameId);

  const navigate = useNavigate();

  useEffect(() => {
    if (successHash) {
      navigate(ROUTES_NAMES.BLACKJACK);
    }
  }, [successHash]);

  return (
    <SecondaryButton onClick={quitGame} loading={isLoading}>
      Quit Game
      <img src={QuitIcon} className="w-[18px] bg-transparent" />
    </SecondaryButton>
  );
};

export default QuitGameBtn;
