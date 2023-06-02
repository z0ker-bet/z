import { BOARD_DATA_TYPE } from '@/constants/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  endedGameIds: Array<number>;
  blackjsackBoards: Array<BOARD_DATA_TYPE>;
};

const initialState: InitialState = {
  endedGameIds: [],
  blackjsackBoards: [],
};

const blackjackSlice = createSlice({
  name: 'blackjack',
  initialState,
  reducers: {
    setEndedGameIdsData: (state, action: PayloadAction<Array<number>>) => {
      state.endedGameIds = action.payload;
    },
    setBlackjsackBoardsData: (
      state,
      action: PayloadAction<Array<BOARD_DATA_TYPE>>
    ) => {
      state.blackjsackBoards = action.payload;
    },
  },
});

export default blackjackSlice;

export const {
  setEndedGameIdsData,
  setBlackjsackBoardsData,
} = blackjackSlice.actions;
