import React, { useEffect, useMemo, memo } from 'react';
import { useAccount } from 'wagmi';
import { useGetShuffle } from '@/hooks/blackjack/useGetShuffle';
import JoinBoardBtn from '@/components/Blackjack/JoinBoardBtn';
import {
  PLAYER_NUMBER,
  PLAYER_PRIV_NUMBER,
  GAME_STATES,
} from '@/constants/blackjack';
import { useGetDecryptDeck } from '@/hooks/blackjack/useGetDecryptDeck';
import PlayerDealBtn from '@/components/Blackjack/PlayerDealBtn';
import PlayerHitCardBtn from '@/components/Blackjack/PlayerHitCardBtn';
import { useGetDecryptHit } from '@/hooks/blackjack/useGetDecryptHit';
import PlayerStandBtn from '@/components/Blackjack/PlayerStandBtn';
// import { useGetBetPrice } from '@/hooks/blackjack/useGetBetPrice';
import PlayerDoubleBtn from '@/components/Blackjack/PlayerDoubleBtn';

type PlayerActionsType = {
  state: number;
  gameId: number;
  betPrice: number;
  isDoubled: boolean;
  dataDeck: any;
  onActionShuffle: (value: boolean) => void;
  indexNextHit: number;
};

const PlayerActions: React.FC<PlayerActionsType> = ({
  state,
  gameId,
  dataDeck,
  onActionShuffle,
  indexNextHit,
  betPrice,
}) => {
  console.log('state', state);
  const { address } = useAccount();
  // const { dataBetPrice } = useGetBetPrice();

  const gamePublicNumber = PLAYER_NUMBER;

  const gamePrivNumber = PLAYER_PRIV_NUMBER;

  const {
    getShuffle,
    data: shuffleResultInput,
    loading: shuffleLoading,
  } = useGetShuffle(gamePublicNumber, dataDeck, true);
  const {
    getDecryptDeck,
    data: dealResultInput,
    loading: decryptDeckLoading,
  } = useGetDecryptDeck(
    gameId ? +gameId : 0,
    gamePublicNumber,
    gamePrivNumber,
    dataDeck,
    4,
    0
  );
  const {
    getDecryptDeck: getDecryptStand,
    data: resultStand,
    loading: decryptStandLoading,
  } = useGetDecryptDeck(
    gameId ? +gameId : 0,
    gamePublicNumber,
    gamePrivNumber,
    dataDeck,
    4,
    indexNextHit
  );
  const {
    getDecryptHit,
    data: decryptHitResult,
    loading: decryptHitLoading,
  } = useGetDecryptHit(
    gameId ? +gameId : 0,
    gamePublicNumber,
    gamePrivNumber,
    dataDeck,
    indexNextHit
  );

  useEffect(() => {
    if (state === GAME_STATES.DEALER_SHUFFLED) {
      getShuffle();
    }
  }, [dataDeck]);

  useEffect(() => {
    if (
      state === GAME_STATES.DEALER_DEAL3 ||
      state === GAME_STATES.DEALER_DEAL_HIT
    ) {
      getDecryptStand();
    }
  }, [state]);

  useEffect(() => {
    if (state === GAME_STATES.PLAYER_JOIN_AND_SHUFFLE) {
      getDecryptDeck();
    }
  }, [dataDeck, indexNextHit]);

  useEffect(() => {
    if (
      state === GAME_STATES.DEALER_DEAL3 ||
      state === GAME_STATES.DEALER_DEAL_HIT
    ) {
      getDecryptHit();
    }
  }, [dataDeck, indexNextHit]);

  const isShuffleLoading = useMemo(
    () =>
      shuffleLoading ||
      decryptDeckLoading ||
      decryptStandLoading ||
      decryptHitLoading,
    [shuffleLoading, decryptDeckLoading, decryptStandLoading, decryptHitLoading]
  );

  useEffect(() => {
    onActionShuffle(isShuffleLoading);
  }, [isShuffleLoading]);

  return (
    <div className="flex justify-center items-center flex-row text-white gap-3">
      {!!address && (
        <>
          {state === GAME_STATES.DEALER_SHUFFLED &&
            shuffleResultInput?.result &&
            shuffleResultInput?.result?.length >= 4 && (
              <JoinBoardBtn
                resultInput={shuffleResultInput}
                gameId={gameId ? +gameId : 0}
                betPrice={betPrice}
              />
            )}
          {(state === GAME_STATES.DEALER_DEAL_HIT ||
            state === GAME_STATES.DEALER_DEAL3) &&
            resultStand?.result &&
            resultStand?.result?.length >= 4 && (
              <>
                <PlayerStandBtn
                  resultInput={resultStand}
                  gameId={gameId ? +gameId : 0}
                />
                <PlayerDoubleBtn
                  resultInput={resultStand}
                  gameId={gameId ? +gameId : 0}
                  betPrice={betPrice}
                />
              </>
            )}
          {state === GAME_STATES.PLAYER_JOIN_AND_SHUFFLE &&
            dealResultInput?.result &&
            dealResultInput?.result?.length >= 4 && (
              <PlayerDealBtn
                resultInput={dealResultInput}
                gameId={gameId ? +gameId : 0}
              />
            )}
          {(state === GAME_STATES.DEALER_DEAL3 ||
            state === GAME_STATES.DEALER_DEAL_HIT) &&
            decryptHitResult?.result &&
            decryptHitResult?.result?.length >= 4 && (
              <PlayerHitCardBtn
                resultInput={decryptHitResult}
                gameId={gameId ? +gameId : 0}
              />
            )}
        </>
      )}
    </div>
  );
};

export default memo(PlayerActions);
