import { useCallback, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '@/constants';
import { useAccount } from 'wagmi';

export const usePostPublicSignals = (gameId: number) => {
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState(false);
  const { address } = useAccount();

  const postPublicSignals = useCallback(
    async (publicSignals: any) => {
      if (!gameId || !address) return;
      console.log('===START postPublicSignals');
      try {
        setLoading(true);
        setError(undefined);
        await axios({
          method: 'post',
          baseURL: BACKEND_URL,
          url: `/game/${`${address?.toLowerCase()}_${gameId}`}`,
          data: {
            publicSignals,
          },
        });

        setLoading(false);
      } catch (error: any) {
        console.log('postPublicSignals Error: ', error);
        setError(error);
        setLoading(false);
        return;
      }
    },
    [address, gameId]
  );

  return { postPublicSignals, loading, error };
};
