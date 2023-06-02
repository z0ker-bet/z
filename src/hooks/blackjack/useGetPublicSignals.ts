import { useCallback, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '@/constants';
import { useAccount } from 'wagmi';

export const useGetPublicSignals = (gameId: number) => {
  const [error, setError] = useState<any>();
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(false);
  const { address } = useAccount();

  const getPublicSignals = useCallback(async () => {
    if (!gameId || !address) return;
    console.log('===START getPublicSignals');
    try {
      setLoading(true);
      setError(undefined);
      const result = await axios({
        method: 'get',
        baseURL: BACKEND_URL,
        url: `/game/${`${address?.toLowerCase()}_${gameId}`}`,
      });

      const data = result?.data?.data?.data?.publicSignals;
      setLoading(false);
      setData(data);
      return data;
    } catch (error: any) {
      console.log('getPublicSignals Error: ', error);
      setError(error);
      setLoading(false);
      return;
    }
  }, [address, gameId]);

  return { getPublicSignals, data, loading, error };
};
