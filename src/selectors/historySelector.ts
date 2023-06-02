import { RootState } from '@/store';
import { createSelector } from '@reduxjs/toolkit';

const historySelector = (state: RootState) => state.history;

export const historyDataSelector = createSelector(
  historySelector,
  (historyState) => historyState.historyData
);

export const historyLoadingSelector = createSelector(
  historySelector,
  (historyState) => historyState.historyLoading
);
