import React, { useCallback, useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { useGetBoardIndexCounter } from '@/hooks/blackjack/useGetBoardIndexCounter';
import { useGetCurrentInBoard } from '@/hooks/blackjack/useGetCurrentInBoard';
import TableNewGame from '@/components/Blackjack/TableNewGame';
import PageTitle from '@/components/Layout/PageTitle';
import GameDetailCard from '@/components/GameDetailCard';
import { useGetAllBoard } from '@/hooks/blackjack/useGetAllBoard';
import GameItemCard from '@/components/GameItemCard';
import { Col, Row } from 'antd';
import { BOARD_DATA_TYPE } from '@/constants/types';
import { useNavigate } from 'react-router-dom';
import { ROUTES_NAMES } from '@/router/router';
import { blackjsackBoardsDataSelector } from '@/selectors/blackjackSelector';
import { useSelector } from 'react-redux';
import LoadingCard from '@/components/LoadingCard';

const Blackjack: React.FC = () => {
  const { address } = useAccount();
  const navigate = useNavigate();
  const [isCreateNewGame, setIsCreateNewGame] = useState<boolean>(false);
  const {
    getBoardIndexCounter,
    dataBoardIndexCounter,
  } = useGetBoardIndexCounter();
  const { getCurrentInBoard, dataCurrentInBoard } = useGetCurrentInBoard(
    address
  );

  const { isLoading } = useGetAllBoard(
    +dataBoardIndexCounter || 0,
    +dataCurrentInBoard || 0
  );

  const dataAllBoard = useSelector(blackjsackBoardsDataSelector);

  const fetchData = useCallback(() => {
    getBoardIndexCounter();
    getCurrentInBoard();
  }, [getBoardIndexCounter, getCurrentInBoard]);

  const handleFinishCreate = useCallback(() => {
    fetchData();
    setIsCreateNewGame(true);
  }, [fetchData]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (isCreateNewGame && +dataCurrentInBoard) {
      navigate(
        ROUTES_NAMES.BLACKJACK_DETAIL.replace(
          ':gameId',
          `${+dataCurrentInBoard}`
        )
      );
    }
  }, [isCreateNewGame, dataCurrentInBoard]);

  return (
    <div className="flex gap-5 flex-col text-white">
      <PageTitle title="BLACKJACK" />
      <div className="flex flex-col flex-1 gap-4">
        <GameDetailCard gameType="blackjack">
          <div className="w-full h-full">
            <TableNewGame
              onFinish={handleFinishCreate}
              currentGame={dataCurrentInBoard}
            />
          </div>
        </GameDetailCard>
        {isLoading ? (
          <div className="w-full flex items-center justify-center py-6 px-4">
            <LoadingCard />
          </div>
        ) : (
          <>
            {!!dataAllBoard && (
              <Row gutter={[16, 16]} className="w-full mx-0 my-4">
                {dataAllBoard.map((item: BOARD_DATA_TYPE) => (
                  <Col xs={24} md={12} xl={8} key={`${item.id}`}>
                    <GameItemCard board={item} />
                  </Col>
                ))}
              </Row>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Blackjack;
