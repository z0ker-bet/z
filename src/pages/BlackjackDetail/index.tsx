import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import TableGame from '@/components/Blackjack/TableGame';
import PageTitle from '@/components/Layout/PageTitle';
import GameDetailCard from '@/components/GameDetailCard';
import { useGetDetailGameById } from '@/hooks/blackjack/useGetDetailGameById';
import HistoryTable from '@/components/HistoryTable';

const BlackjackDetail: React.FC = () => {
  const { gameId } = useParams();

  const { getDetailGameData, detailGames } = useGetDetailGameById(
    gameId ? +gameId : 0
  );

  const {
    dataBoard,
    dataDeck,
    dataPlayerCards,
    dataDealerCards,
    dataUserDecrypteds,
    dataDealerDecrypteds,
  } = detailGames || {};

  const indexNextHit = useMemo(() => {
    const dealerCardLength =
      !!dataDealerCards && dataDealerCards?.length > 2
        ? dataDealerCards?.length
        : 2;
    const playerCardLength =
      !!dataPlayerCards && dataPlayerCards?.length > 2
        ? dataPlayerCards?.length
        : 2;
    return dealerCardLength + playerCardLength;
  }, [dataDealerCards, dataPlayerCards]);

  useEffect(() => {
    const interval = setInterval(() => {
      getDetailGameData();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex gap-5 flex-col text-white">
      <PageTitle title={`BLACKJACK #${gameId}`} />
      <div className="flex flex-col flex-1 gap-4">
        <GameDetailCard gameType="blackjack-detail">
          <div className="w-full h-full">
            <TableGame
              gameId={gameId ? +gameId : 0}
              board={dataBoard}
              dealerCard={
                dataDealerCards && dataDealerCards.length > 0
                  ? dataDealerCards
                  : [0, 0]
              }
              playerCard={
                dataPlayerCards && dataPlayerCards.length > 0
                  ? dataPlayerCards
                  : [0, 0]
              }
              dataUserDecrypteds={dataUserDecrypteds}
              dataDealerDecrypteds={dataDealerDecrypteds}
              dataDeck={dataDeck}
              indexNextHit={indexNextHit}
            />
          </div>
        </GameDetailCard>
        <HistoryTable />
      </div>
    </div>
  );
};

export default BlackjackDetail;
