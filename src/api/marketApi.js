import axiosClient from './axiosClient';
import { USE_MOCK_API } from '../utils/constants';
import { generateMockCandles } from '../mocks/mockData';

export const fetchMarketHistory = async (symbol, timeframe, startDate, endDate) => {
  if (USE_MOCK_API) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(generateMockCandles({ startDate, count: 80, basePrice: symbol === 'ETHUSDT' ? 2400 : 42000 }));
      }, 250);
    });
  }

  const response = await axiosClient.get(`/market/history/${symbol}`, {
    params: { timeframe, startDate, endDate },
  });
  return response.data;
};
