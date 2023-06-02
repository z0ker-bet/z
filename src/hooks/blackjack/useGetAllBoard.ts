import { useCallback, useEffect, useMemo } from 'react';
import { useContractReads } from 'wagmi';
import { BLACKJACK_ABI, BLACKJACK_ADDRESS, CHAIN_ID } from '@contracts/index';
import { ZERO_ADDRESS } from '@/constants';
import { STATE_FOR_END_GAME } from '@/constants/blackjack';
import { ethers } from 'ethers';
import { BOARD_DATA_TYPE, BOARD_STATUS_TYPE } from '@/constants/types';
import { useDispatch, useSelector } from 'react-redux';
import {
  setBlackjsackBoardsData,
  setEndedGameIdsData,
} from '@/slices/blackjackSlice';
import {
  blackjsackBoardsDataSelector,
  endedGameIdsDataSelector,
} from '@/selectors/blackjackSelector';

const defaultValue: BOARD_DATA_TYPE = {
  id: 0,
  dealer: '',
  player: '',
  betPrice: 0,
  dealerPointMax: 0,
  dealerPointMin: 0,
  state: 0,
  canDouble: 0,
  canInsure: 0,
  dealerBal: 0,
  playerBet: 0,

  playerPointMax: 0,
  playerPointMin: 0,

  isHasPlayer: false,
  isDoubled: false,
  status: 'error',
  order: 5,
};

export const useGetAllBoard = (numberBoard: number, currentGameId: number) => {
  const dispatch = useDispatch();
  const contractConfig = {
    address: BLACKJACK_ADDRESS,
    abi: BLACKJACK_ABI,
    functionName: 'getBoard',
    chainId: CHAIN_ID,
    cacheTime: 100,
  };

  const blackjsackBoardsData = useSelector(blackjsackBoardsDataSelector);
  const endedGameIdsData = useSelector(endedGameIdsDataSelector);

  const blackjackIdsNotEnded = useMemo(() => {
    if (!numberBoard) return [];
    return [...Array(numberBoard).keys()].filter(
      (item) => !endedGameIdsData.includes(item + 1)
    );
  }, [numberBoard, endedGameIdsData]);
  const readAllConfig = useMemo(
    () =>
      [...blackjackIdsNotEnded].map((item) => ({
        ...contractConfig,
        args: [item + 1],
      })),
    [numberBoard, blackjackIdsNotEnded]
  );

  const { data, isError, isLoading, refetch } = useContractReads({
    contracts: readAllConfig,
    allowFailure: true,
    enabled: numberBoard > 0,
  });

  const getAllBoard = useCallback(async () => {
    refetch();
  }, []);

  useEffect(() => {
    if (numberBoard) {
      getAllBoard();
    }
  }, [numberBoard]);

  useEffect(() => {
    if (!data) return;
    const dataValue: any = data || [];
    const notEndeddataValue: BOARD_DATA_TYPE[] = dataValue.map(
      (item: any, index: number) => {
        if (!item || item.length < 0) {
          return { ...defaultValue, id: blackjackIdsNotEnded[index] + 1 };
        }

        const board: BOARD_DATA_TYPE = {
          id: blackjackIdsNotEnded[index] + 1,
          dealer: item[0].toLowerCase(),
          player: item[1].toLowerCase(),
          betPrice: item[2] ? +ethers.utils.formatEther(`${+item[2]}`) : 0,
          dealerPointMax: item[3] ? +item[3] : 0,
          dealerPointMin: item[4] ? +item[4] : 0,
          state: item[5] ? +item[5] : 0,
          canDouble: item[6] ? +item[6] : 0,
          canInsure: item[7] ? +item[7] : 0,
          dealerBal: item[8] ? +ethers.utils.formatEther(`${+item[8]}`) : 0,
          playerBet: item[9] ? +ethers.utils.formatEther(`${+item[9]}`) : 0,
          playerPointMax: item[10] ? +item[10] : 0,
          playerPointMin: item[11] ? +item[11] : 0,
          isHasPlayer: item[1] && item[1].toLowerCase() !== ZERO_ADDRESS,
        };

        let status: BOARD_STATUS_TYPE = 'error';
        let order: number = 5;
        if (currentGameId === board.id) {
          status = 'Current Board';
          order = 1;
        } else if (STATE_FOR_END_GAME.includes(board.state)) {
          status = 'ended';
          order = 4;
        } else if (
          !!board.player &&
          !!board.dealer &&
          board.player !== ZERO_ADDRESS
        ) {
          status = 'playing';
          order = 3;
        } else if (!board.player || board.player === ZERO_ADDRESS) {
          status = 'waiting';
          order = 2;
        }

        return { ...board, status, order };
      }
    );

    let endedIds: number[] = [];
    const newBoardsData: BOARD_DATA_TYPE[] = [...Array(numberBoard).keys()]
      .map((item) => {
        let newBoardData;
        if (item > blackjsackBoardsData.length) {
          newBoardData = notEndeddataValue.find(
            (newItem: BOARD_DATA_TYPE) => newItem.id === item + 1
          );
        }
        if (endedGameIdsData.includes(item + 1)) {
          newBoardData = blackjsackBoardsData.find(
            (newItem: BOARD_DATA_TYPE) => newItem.id === item + 1
          );
        } else {
          newBoardData = notEndeddataValue.find(
            (newItem: BOARD_DATA_TYPE) => newItem.id === item + 1
          );
        }
        if (newBoardData && STATE_FOR_END_GAME.includes(newBoardData.state)) {
          endedIds = [...endedIds, newBoardData.id];
        }
        if (!newBoardData) {
          console.log('====Error boardData item', item + 1);
        }
        return newBoardData || defaultValue;
      })
      .sort((a: BOARD_DATA_TYPE, b: BOARD_DATA_TYPE) =>
        a.order && b.order ? a.order - b.order : 0
      );

    dispatch(setEndedGameIdsData(endedIds));
    dispatch(setBlackjsackBoardsData(newBoardsData));
  }, [data]);

  return { getAllBoard, isError, isLoading };
};
