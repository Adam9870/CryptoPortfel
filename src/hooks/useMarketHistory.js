import { useState } from 'react';
import { fetchMarketHistory } from '../api/marketApi';

export function useMarketHistory() {
  const [candles, setCandles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadCandles = async ({ symbol, timeframe, startDate, endDate }) => {
    try {
      setLoading(true);
      setError('');
      const data = await fetchMarketHistory(symbol, timeframe, startDate, endDate);
      setCandles(data);
      return data;
    } catch (err) {
      setError(err?.message || 'Nie udało się pobrać danych rynku');
      return [];
    } finally {
      setLoading(false);
    }
  };

  return { candles, loading, error, loadCandles, setCandles };
}
