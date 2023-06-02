import { combineReducers, configureStore } from '@reduxjs/toolkit';
import historySlice from './slices/historySlice';
import blackjackSlice from './slices/blackjackSlice';

const rootReducer = combineReducers({
  [historySlice.name]: historySlice.reducer,
  [blackjackSlice.name]: blackjackSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV === 'development',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
