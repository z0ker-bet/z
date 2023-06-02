import { useCallback, useEffect, useMemo } from 'react';
import { useContractReads } from 'wagmi';
import { BLACKJACK_ABI, BLACKJACK_ADDRESS, CHAIN_ID } from '@contracts/index';
import { BOARD_DATA_TYPE } from '@/constants/types';
import { ethers } from 'ethers';
import { ZERO_ADDRESS } from '@/constants';
// import { STATE_FOR_END_GAME } from '@/constants/blackjack';

const ennhanceCardsData = (inputData: any) => {
  if (!inputData) return [];
  const valueData: any = inputData;
  return valueData.map((item: any) => item.toNumber());
};

const ennhanceBoardData = (
  inputData: any,
  gameId: number
  // currentGameId: number
) => {
  const dataValue: any = inputData;
  if (!dataValue || dataValue.length === 0) {
    const board: BOARD_DATA_TYPE = {
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
      // status: 'error',
    };
    return board;
  }

  const board: BOARD_DATA_TYPE = {
    id: gameId,
    dealer: dataValue[0].toLowerCase(),
    player: dataValue[1].toLowerCase(),
    betPrice: dataValue[2] ? +ethers.utils.formatEther(`${+dataValue[2]}`) : 0,
    dealerPointMax: dataValue[3] ? +dataValue[3] : 0,
    dealerPointMin: dataValue[4] ? +dataValue[4] : 0,
    state: dataValue[5] ? +dataValue[5] : 0,
    canDouble: dataValue[6] ? +dataValue[6] : 0,
    canInsure: dataValue[7] ? +dataValue[7] : 0,
    dealerBal: dataValue[8] ? +ethers.utils.formatEther(`${+dataValue[8]}`) : 0,
    playerBet: dataValue[9] ? +ethers.utils.formatEther(`${+dataValue[9]}`) : 0,
    playerPointMax: dataValue[10] ? +dataValue[10] : 0,
    playerPointMin: dataValue[11] ? +dataValue[11] : 0,
    isHasPlayer: dataValue[1] && dataValue[1].toLowerCase() !== ZERO_ADDRESS,
  };

  board.isDoubled =
    board.betPrice > 0 &&
    board.playerBet > 0 &&
    board.playerBet >= board.betPrice * 2;

  // let status: BOARD_STATUS_TYPE = 'error';
  // if (currentGameId === board.id) {
  //   status = 'Current Board';
  // } else if (STATE_FOR_END_GAME.includes(board.state)) {
  //   status = 'ended';
  // } else if (
  //   !!board.player &&
  //   !!board.dealer &&
  //   board.player !== ZERO_ADDRESS
  // ) {
  //   status = 'playing';
  // } else if (!board.player) {
  //   status = 'waiting';
  // }

  return board;
};

export const useGetDetailGameById = (gameId: number) => {
  const contractConfig = {
    address: BLACKJACK_ADDRESS,
    abi: BLACKJACK_ABI,
    chainId: CHAIN_ID,
    cacheTime: 100,
  };

  const readAllConfig = useMemo(
    () => [
      {
        ...contractConfig,
        functionName: 'getBoard',
        args: [gameId],
      },
      {
        ...contractConfig,
        functionName: 'getDeck',
        args: [gameId],
      },
      {
        ...contractConfig,
        functionName: 'getPlayerCards',
        args: [gameId],
      },
      {
        ...contractConfig,
        functionName: 'getDealerCards',
        args: [gameId],
      },
      {
        ...contractConfig,
        functionName: 'getUserDecrypteds',
        args: [gameId],
      },
      {
        ...contractConfig,
        functionName: 'getDealerDecrypteds',
        args: [gameId],
      },
    ],
    [gameId]
  );

  const { data, isError, isLoading, refetch } = useContractReads({
    contracts: readAllConfig,
    allowFailure: true,
    enabled: gameId > 0,
  });

  const getDetailGameData = useCallback(async () => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (gameId) {
      getDetailGameData();
    }
  }, [gameId]);

  const detailGames = useMemo(() => {
    if (!data)
      return {
        dataBoard: ennhanceBoardData([], gameId),
        dataDeck: [],
        dataPlayerCards: [],
        dataDealerCards: [],
        dataUserDecrypteds: [],
        dataDealerDecrypteds: [],
      };
    return {
      dataBoard: ennhanceBoardData(data[0], gameId),
      dataDeck: data[1],
      dataPlayerCards: ennhanceCardsData(data[2]),
      dataDealerCards: ennhanceCardsData(data[3]),
      dataUserDecrypteds: data[4],
      dataDealerDecrypteds: data[5],
    };
  }, [data]);

  return { getDetailGameData, detailGames, isError, isLoading };
};
