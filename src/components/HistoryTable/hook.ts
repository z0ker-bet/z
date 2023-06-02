import { historyDataSelector } from '@/selectors/historySelector';
import { fetchHistory } from '@/slices/historySlice';
import { AppDispatch } from '@/store';
import moment from 'moment';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export type HistoryDataTable = {
  key: React.Key;
  createdAt: string;
  player: string;
  dealer: string;
  game: string;
  transactionHash: string;
  eventName: string;
  // bets: string;
  // wager: string;
  // multiplier: string;
  // payout: string;
  // profit: string;
};

export type ReceivedProps = Record<string, any>;

const useHistoryTable = (props: ReceivedProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const historyData = useSelector(historyDataSelector);

  useEffect(() => {
    try {
      dispatch(fetchHistory());
    } catch (error) {
      /* empty */
    }

    const fetchHistoryInterval = setInterval(async () => {
      try {
        dispatch(fetchHistory());
      } catch (error) {
        /* empty */
      }
    }, 10000);

    return () => {
      clearInterval(fetchHistoryInterval);
    };
  }, [dispatch]);

  const historyDataTable: HistoryDataTable[] = useMemo(
    () =>
      historyData.map((historyItem) => ({
        key: historyItem.id,
        createdAt: moment(historyItem.createdAt).format('YYYY-MM-DD HH:mm:ss'),
        game: historyItem.data.id,
        player: historyItem.data.player,
        dealer: historyItem.data.dealer,
        transactionHash: historyItem.transactionHash,
        eventName: historyItem.eventName,

        // bets: '1',
        // wager: '100',
        // multiplier: '1.96x',
        // payout: '196',
        // profit: '+96',
      })),
    [historyData]
  );

  return {
    historyDataTable,
    ...props,
  };
};

export type Props = ReturnType<typeof useHistoryTable>;

export default useHistoryTable;
