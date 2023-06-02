import { useCallback, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '@/constants';
import { useAccount } from 'wagmi';
import { DECRYPT_RESPONE_TYPE } from '@/constants/types';

export const useGetShuffle = (
  gamePublicNumber: number,
  current_deck: any,
  is_player?: boolean
) => {
  const [data, setData] = useState<DECRYPT_RESPONE_TYPE>({});
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState(false);
  const { address } = useAccount();

  const getShuffle = useCallback(async () => {
    if (!current_deck || !address || !gamePublicNumber) return;
    console.log('===START getShuffle');
    try {
      setLoading(true);
      setError(undefined);
      setData({});
      const result = await axios({
        method: 'post',
        baseURL: BACKEND_URL,
        url: '/shuffle',
        data: {
          public_number: gamePublicNumber,
          current_deck: current_deck.map((item: any) => item.toString()),
          is_player,
        },
      });

      setLoading(false);
      const data: DECRYPT_RESPONE_TYPE = result?.data?.data || {};
      setData(data);

      return data;
    } catch (error: any) {
      console.log('getShuffle Error: ', error);
      setError(error);
      setLoading(false);
      setData({});
      return;
    }
  }, [gamePublicNumber, current_deck, address, is_player]);

  return { getShuffle, data, loading, error };
};
