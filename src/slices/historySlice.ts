import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export type HistoryDataResponse = {
  id: string;
  block: number;
  eventName: string;
  transactionHash: string;
  data: {
    id: string;
    dealer: string;
    player: string;
  };
  createdAt: string;
  updatedAt: string;
};

type InitialState = {
  historyData: Array<HistoryDataResponse>;
  historyLoading: boolean;
};

const initialState: InitialState = {
  historyData: [],
  historyLoading: false,
};

import { createAsyncThunk } from '@reduxjs/toolkit';
import { BACKEND_URL } from '@/constants';

export const fetchHistory = createAsyncThunk('history/fetchHistory', async () => {
  const result = await axios({
    method: 'get',
    baseURL: BACKEND_URL,
    url: `/event?page=1&size=50`,
  });
  return result.data?.data;
});

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    setHistoryData: (
      state,
      action: PayloadAction<Array<HistoryDataResponse>>
    ) => {
      state.historyData = action.payload;
    },
    setHistoryLoading: (state, action: PayloadAction<boolean>) => {
      state.historyLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchHistory.pending, (state) => {
      state.historyLoading = true;
    });
    builder.addCase(
      fetchHistory.fulfilled,
      (state, action: PayloadAction<Array<HistoryDataResponse>>) => {
        state.historyLoading = false;
        state.historyData = action.payload;
      }
    );
    builder.addCase(fetchHistory.rejected, (state) => {
      state.historyLoading = false;
    });
  },
});

export default historySlice;

export const { setHistoryLoading, setHistoryData } = historySlice.actions;
