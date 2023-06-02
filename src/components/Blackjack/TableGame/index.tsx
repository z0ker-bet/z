import React, { useMemo, useState } from 'react';
import styles from './style.module.scss';
import PlayCardList from '../PlayCardList';
import { useAccount } from 'wagmi';
import {
  GAME_STATES,
  GAME_STATES_TITLE,
  STATE_FOR_END_GAME,
  STATE_FOR_NEXT_DEALER_ACTIONS,
  STATE_FOR_NEXT_PLAYER_ACTIONS,
} from '@/constants/blackjack';
import DealerActions from '@/pages/BlackjackDetail/DealerActions';
import PlayerActions from '@/pages/BlackjackDetail/PlayerActions';
import QuitGameBtn from '../QuitGameBtn';
import { BOARD_DATA_TYPE } from '@/constants/types';
import InfoIcon from '@assets/images/icons/info-icon.svg';
import { Link } from 'react-router-dom';
import { ROUTES_NAMES } from '@/router/router';
// import CreateGameBtn from '../CreateGameBtn';
// import { useGetBetPrice } from '@/hooks/blackjack/useGetBetPrice';
// import { useGetCurrentInBoard } from '@/hooks/blackjack/useGetCurrentInBoard';
import BackBtn from '../BackBtn';
import BetInfo from '../BetInfo';
import PrimaryButton from '@/components/atoms/buttons/PrimaryButton';
// import LoadingCard from '@/components/LoadingCard';

type TableGameType = {
  gameId: number;
  board: BOARD_DATA_TYPE;
  dealerCard: number[];
  playerCard: number[];
  dataUserDecrypteds: any;
  dataDealerDecrypteds: any;
  dataDeck: any;
  indexNextHit: number;
};

const TableGame: React.FC<TableGameType> = ({
  gameId,
  board,
  playerCard,
  dealerCard,
  dataUserDecrypteds,
  dataDealerDecrypteds,
  dataDeck,
  indexNextHit,
}) => {
  const [isLoadingDealerShuffle, setIsLoadingDealerShuffle] = useState(false);
  const [isLoadingPlayerShuffle, setIsLoadingPlayerShuffle] = useState(false);
  // const navigate = useNavigate();
  // const [isCreateNewGame, setIsCreateNewGame] = useState<boolean>(false);
  const { address } = useAccount();
  // const { dataBetPrice } = useGetBetPrice();
  // const {
  //   getCurrentInBoard,
  //   dataCurrentInBoard,
  //   isLoading: currentBoardLoading,
  // } = useGetCurrentInBoard(address);
  const isDealer = useMemo(() => {
    return !!address && board.dealer === address.toLowerCase();
  }, [address, board.dealer]);
  const isPlayer = useMemo(() => {
    return !!address && board.player === address.toLowerCase();
  }, [address, board.player]);

  const isGuest = useMemo(() => !isPlayer && !isDealer, [isPlayer, isDealer]);

  const isShowPlayerAction = useMemo(
    () =>
      !!address &&
      !!gameId &&
      STATE_FOR_NEXT_PLAYER_ACTIONS.includes(board.state) &&
      (board.player === address.toLowerCase() ||
        (board.dealer !== address?.toLowerCase() &&
          board.state === GAME_STATES.DEALER_SHUFFLED)),
    [board.state, board.dealer, board.player, address, gameId]
  );

  const isShowDealerAction = useMemo(
    () =>
      !!address &&
      !!gameId &&
      board.dealer === address.toLowerCase() &&
      STATE_FOR_NEXT_DEALER_ACTIONS.includes(board.state),
    [board.state, board.dealer, address, gameId]
  );

  const title = GAME_STATES_TITLE[board.state];

  // useEffect(() => {
  //   if (isCreateNewGame && +dataCurrentInBoard && !currentBoardLoading) {
  //     navigate(
  //       ROUTES_NAMES.BLACKJACK_DETAIL.replace(
  //         ':gameId',
  //         `${+dataCurrentInBoard}`
  //       )
  //     );
  //   }
  // }, [isCreateNewGame, dataCurrentInBoard, currentBoardLoading]);

  // useEffect(() => {
  //   if (STATE_FOR_END_GAME.includes(board.state)) {
  //     getCurrentInBoard();
  //   }
  // }, [board.state]);

  return (
    <div className={styles.tableGame}>
      <div className="w-full min-h-[650px] flex flex-col justify-end items-center uppercase font-black text-[90px] leading-none text-white">
        {!!board.id && playerCard && playerCard.length > 0 && (
          <PlayCardList
            values={playerCard}
            isOwnerView={isGuest || isPlayer}
            maxPoint={board.playerPointMax}
            minPoint={board.playerPointMin}
            isDealer={false}
            isActive={STATE_FOR_NEXT_PLAYER_ACTIONS.includes(board.state)}
            isOwner={!isGuest}
            address={board.player}
            isLoadingShuffle={isLoadingPlayerShuffle}
            isDoubled={!!board.isDoubled}
          />
        )}
        {!!board.id && dealerCard && dealerCard.length > 0 && (
          <PlayCardList
            values={dealerCard.length === 1 ? [...dealerCard, 0] : dealerCard}
            isOwnerView={isDealer}
            maxPoint={board.dealerPointMax}
            minPoint={board.dealerPointMin}
            isDealer
            isActive={STATE_FOR_NEXT_DEALER_ACTIONS.includes(board.state)}
            isOwner={!isGuest}
            address={board.dealer}
            isLoadingShuffle={isLoadingDealerShuffle}
          />
        )}

        <div
          className="flex justify-center items-center w-full absolute bottom-0 h-[100px]"
          style={{
            background:
              'linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0) 100%)',
            transform: 'rotate(180deg)',
          }}
        />
        <div className="flex justify-center items-center w-full h-[100px] pb-6 text-base z-100">
          <div>
            {isShowDealerAction && (
              <DealerActions
                state={board.state}
                dataUserDecrypteds={dataUserDecrypteds}
                dataDealerDecrypteds={dataDealerDecrypteds}
                dataDeck={dataDeck}
                gameId={gameId ? +gameId : 0}
                onActionShuffle={setIsLoadingDealerShuffle}
                indexNextHit={indexNextHit}
              />
            )}
            {isShowPlayerAction && (
              <PlayerActions
                state={board.state}
                dataDeck={dataDeck}
                gameId={gameId ? +gameId : 0}
                onActionShuffle={setIsLoadingPlayerShuffle}
                indexNextHit={indexNextHit}
                betPrice={board.betPrice}
                isDoubled={!!board.isDoubled}
              />
            )}
            {/* {!isGuest &&
              !isShowPlayerAction &&
              !isShowDealerAction &&
              'WAITING...'} */}
            {STATE_FOR_END_GAME.includes(board.state) && (
              <Link to={ROUTES_NAMES.BLACKJACK}>
                <PrimaryButton>Other Game</PrimaryButton>
              </Link>
            )}
            {/* {!isGuest && (
              <>
                {STATE_FOR_END_GAME.includes(board.state) ? (
                  <div>
                    {!dataCurrentInBoard && (
                      <CreateGameGroupBtn
                        className="mt-8"
                        fee={dataBetPrice * 2}
                        onFinish={() => {
                          getCurrentInBoard();
                          setIsCreateNewGame(true);
                        }}
                      />
                    )}
                  </div>
                ) : (
                  !isShowPlayerAction && !isShowDealerAction && 'WAITING...'
                )}
              </>
            )} */}
          </div>
          <div className="absolute top-3 left-3 normal-case h-[40px] flex gap-2 items-center text-[#FF6B00]">
            <img src={InfoIcon} className="w-5" />
            {title}
          </div>
        </div>
        <div className="absolute top-3 right-3 flex gap-3">
          {(isDealer || isPlayer) &&
            !STATE_FOR_END_GAME.includes(board.state) && (
              <QuitGameBtn gameId={gameId} />
            )}
          <Link to={ROUTES_NAMES.BLACKJACK}>
            <BackBtn />
          </Link>
        </div>
        <div className="absolute bottom-[100px] right-[100px] flex gap-3">
          <BetInfo price={board.betPrice} />
        </div>
      </div>
    </div>
  );
};

export default TableGame;
