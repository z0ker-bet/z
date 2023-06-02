import { RootState } from '@/store';
import { createSelector } from '@reduxjs/toolkit';

const blackjackSelector = (state: RootState) => state.blackjack;

export const blackjsackBoardsDataSelector = createSelector(
  blackjackSelector,
  (blackjackState) => blackjackState.blackjsackBoards
);

export const endedGameIdsDataSelector = createSelector(
  blackjackSelector,
  (blackjackState) => blackjackState.endedGameIds
);
