export type ADDRESS_TYPE =  `0x${string}`;

export type DECRYPT_RESPONE_TYPE = {
  result?: any[],
  publicSignals?: any[],
}
export type BOARD_STATUS_TYPE = 'playing' | 'ended' | 'waiting' | 'Current Board' | 'error';

export type BOARD_DATA_TYPE = {
  id: number;
  dealer: string;
  player: string;
  betPrice: number;
  dealerPointMax: number;
  dealerPointMin: number;
  state: number;
  canDouble: number;
  canInsure: number;
  dealerBal: number;
  playerBet: number;

  playerPointMax: number;
  playerPointMin: number;

  isHasPlayer: boolean;
  status?: BOARD_STATUS_TYPE;
  order?: number;
  isDoubled?: boolean;
};
