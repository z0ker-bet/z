import React, { memo, useEffect, useMemo } from 'react';
import { useAccount } from 'wagmi';
import DealerShuffleBtn from '@/components/Blackjack/DealerShuffleBtn';
import { useGetShuffle } from '@/hooks/blackjack/useGetShuffle';
import {
  DEALER_NUMBER,
  DEALER_PRIV_NUMBER,
  GAME_STATES,
} from '@/constants/blackjack';
import { useGetDecryptDeck } from '@/hooks/blackjack/useGetDecryptDeck';
import DealerDealBtn from '@/components/Blackjack/DealerDealBtn';
import DealHitBtn from '@/components/Blackjack/DealHitBtn';
import { useGetDecryptHit } from '@/hooks/blackjack/useGetDecryptHit';
import DealerOpenHiddenBtn from '@/components/Blackjack/DealerOpenHiddenBtn';
import DealerHitCardBtn from '@/components/Blackjack/DealerHitCardBtn';
import DealerDealDoubleBtn from '@/components/Blackjack/DealerDealDoubleBtn';
// import LoadingCard from '@/components/LoadingCard';

type DealerActionsType = {
  state: number;
  gameId: number;
  dataDeck: any;
  dataUserDecrypteds?: any;
  dataDealerDecrypteds?: any;
  // currentCardIndex?: number;
  indexNextHit: number;
  onActionShuffle: (value: boolean) => void;
};

const DealerActions: React.FC<DealerActionsType> = ({
  state,
  gameId,
  dataDeck,
  dataUserDecrypteds,
  dataDealerDecrypteds,
  // currentCardIndex,
  onActionShuffle,
  indexNextHit,
}) => {
  console.log('state', state);
  const { address } = useAccount();
  console.log('indexNextHit', indexNextHit);

  const indexNextDeallerHitCard = useMemo(() => {
    return !dataDealerDecrypteds
      ? 0
      : dataDealerDecrypteds.filter((item: string) => {
          const valueString = item.toString();
          return !!valueString && valueString !== '0';
        }).length;
  }, [dataDealerDecrypteds]);

  const {
    getShuffle,
    data: resultInput,
    loading: shuffleLoading,
  } = useGetShuffle(DEALER_NUMBER, dataDeck);

  const {
    getDecryptDeck,
    data: dealResultInput,
    loading: decryptDeckLoading,
  } = useGetDecryptDeck(
    gameId,
    DEALER_NUMBER,
    DEALER_PRIV_NUMBER,
    dataUserDecrypteds,
    3,
    0
  );

  const {
    getDecryptHit,
    data: decryptHitResult,
    loading: decryptHitLoading,
  } = useGetDecryptHit(
    gameId,
    DEALER_NUMBER,
    DEALER_PRIV_NUMBER,
    dataUserDecrypteds,
    indexNextHit
  );

  const {
    getDecryptHit: getDecryptDealerHitCard,
    data: decryptDealerHitCardResult,
    loading: decryptDealerHitCardLoading,
  } = useGetDecryptHit(
    gameId,
    DEALER_NUMBER,
    DEALER_PRIV_NUMBER,
    dataUserDecrypteds,
    indexNextDeallerHitCard
  );

  const {
    getDecryptHit: getDecryptOpenHidden,
    data: decryptOpenHiddenResult,
    loading: decryptOpenHiddenResultLoading,
  } = useGetDecryptHit(
    gameId,
    DEALER_NUMBER,
    DEALER_PRIV_NUMBER,
    dataUserDecrypteds,
    3
  );

  useEffect(() => {
    if (state === GAME_STATES.DEALER_STARTED) {
      getShuffle();
    }
  }, [state]);

  useEffect(() => {
    if (
      state === GAME_STATES.PLAYER_DEAL4 &&
      dataUserDecrypteds &&
      dataUserDecrypteds.length > 0
    ) {
      getDecryptDeck();
    }
  }, [state, dataUserDecrypteds]);

  useEffect(() => {
    if (
      [GAME_STATES.PLAYER_DOUBLE, GAME_STATES.PLAYER_HITTING].includes(state) &&
      dataUserDecrypteds &&
      dataUserDecrypteds.length > 0
    ) {
      getDecryptHit();
    }
  }, [state, dataUserDecrypteds, indexNextHit]);
  useEffect(() => {
    if (
      [GAME_STATES.DEALER_DEAL_HIDDEN_CARD, GAME_STATES.DEALER_HIT].includes(
        state
      ) &&
      dataUserDecrypteds &&
      dataUserDecrypteds.length > 0
    ) {
      getDecryptDealerHitCard();
    }
  }, [state, dataUserDecrypteds, indexNextDeallerHitCard]);

  useEffect(() => {
    if (
      state === GAME_STATES.PLAYER_STAND &&
      dataUserDecrypteds &&
      dataUserDecrypteds.length > 0
    ) {
      getDecryptOpenHidden();
    }
  }, [state, dataUserDecrypteds]);

  const isShuffleLoading = useMemo(
    () =>
      shuffleLoading ||
      decryptDeckLoading ||
      decryptHitLoading ||
      decryptDealerHitCardLoading ||
      decryptOpenHiddenResultLoading,
    [
      shuffleLoading,
      decryptDeckLoading,
      decryptHitLoading,
      decryptDealerHitCardLoading,
      decryptOpenHiddenResultLoading,
    ]
  );

  useEffect(() => {
    onActionShuffle(isShuffleLoading);
  }, [isShuffleLoading]);

  return (
    <div className="flex justify-center items-center flex-col">
      <div className="flex justify-center items-center flex-row text-white gap-3">
        {!!address && (
          <>
            {state === GAME_STATES.DEALER_STARTED &&
              resultInput?.result &&
              resultInput?.result?.length >= 4 && (
                <DealerShuffleBtn resultInput={resultInput} gameId={gameId} />
              )}
            {state === GAME_STATES.PLAYER_DEAL4 &&
              dealResultInput?.result &&
              dealResultInput?.result?.length >= 4 && (
                <DealerDealBtn resultInput={dealResultInput} gameId={gameId} />
              )}
            {state === GAME_STATES.PLAYER_HITTING &&
              decryptHitResult?.result &&
              decryptHitResult?.result?.length >= 4 && (
                <DealHitBtn
                  resultInput={decryptHitResult}
                  gameId={gameId}
                  cardIndex={indexNextHit}
                />
              )}
            {state === GAME_STATES.PLAYER_STAND &&
              decryptOpenHiddenResult?.result &&
              decryptOpenHiddenResult?.result?.length >= 4 && (
                <DealerOpenHiddenBtn
                  resultInput={decryptOpenHiddenResult}
                  gameId={gameId}
                />
              )}
            {state === GAME_STATES.PLAYER_DOUBLE &&
              decryptHitResult?.result &&
              decryptHitResult?.result?.length >= 4 && (
                <DealerDealDoubleBtn
                  resultInput={decryptHitResult}
                  gameId={gameId}
                  cardIndex={indexNextHit}
                />
              )}
            {[
              GAME_STATES.DEALER_DEAL_HIDDEN_CARD,
              GAME_STATES.DEALER_HIT,
            ].includes(state) &&
              decryptDealerHitCardResult?.result &&
              decryptDealerHitCardResult?.result?.length >= 4 && (
                <DealerHitCardBtn
                  resultInput={decryptDealerHitCardResult}
                  gameId={gameId}
                  cardIndex={indexNextDeallerHitCard}
                />
              )}
          </>
        )}
      </div>

      {/* {isShuffleLoading && <LoadingCard />} */}
      {/* <LoadingCard /> */}
    </div>
  );
};

export default memo(DealerActions);
