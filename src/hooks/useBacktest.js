import { useState } from 'react';
import { runBacktest } from '../api/backtestApi';

export function useBacktest() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const executeBacktest = async (payload) => {
    try {
      setLoading(true);
      setError('');
      const data = await runBacktest(payload);
      setResult(data);
      return data;
    } catch (err) {
      setError(err?.message || 'Nie udało się wykonać backtestu');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { result, loading, error, executeBacktest };
}
