import { useCallback, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '@/constants';
import { useAccount } from 'wagmi';
import { DECRYPT_RESPONE_TYPE } from '@/constants/types';
import { useGetPublicSignals } from './useGetPublicSignals';
import { setItemLocalstorage } from '@/utils';

export const useGetDecryptDeck = (
  gameId: number,
  gamePublicNumber: number,
  gamePrivNumber: number,
  current_deck: any,
  number_card: number,
  start_card: number
) => {
  const [data, setData] = useState<DECRYPT_RESPONE_TYPE>({});
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState(false);
  const { address } = useAccount();
  const { getPublicSignals } = useGetPublicSignals(gameId);

  const getDecryptDeck = useCallback(async () => {
    try {
      if (!current_deck || !address || !gamePublicNumber || !gameId) return;
      let publicSignalsStr = localStorage.getItem(
        `${address?.toLowerCase()}_${gameId}`
      );
      let publicSignals;
      if (!publicSignalsStr) {
        publicSignals = await getPublicSignals();
        setItemLocalstorage(
          `${address?.toLowerCase()}_${gameId}`,
          JSON.stringify(publicSignals)
        );
      } else {
        publicSignals = JSON.parse(publicSignalsStr);
      }

      setLoading(true);
      setError(undefined);
      setData({});
      const result = await axios({
        method: 'post',
        baseURL: BACKEND_URL,
        url: `/decrypt/deck${number_card}`,
        data: {
          public_number: gamePublicNumber,
          priv_number: gamePrivNumber,
          current_deck: current_deck.map((item: any) => item.toString()),
          public_signals: publicSignals,
          start_card,
        },
      });

      setLoading(false);
      const data: DECRYPT_RESPONE_TYPE = result?.data || {};
      setData(data);

      return data;
    } catch (error: any) {
      console.log('getDecryptDeck Error: ', error);
      setError(error);
      setLoading(false);
      setData({});
      return;
    }
  }, [
    gamePublicNumber,
    current_deck,
    address,
    number_card,
    gamePrivNumber,
    start_card,
  ]);

  return { getDecryptDeck, data, loading, error };
};
