import axiosClient from './axiosClient';
import { USE_MOCK_API } from '../utils/constants';
import { mockBacktestResult, replaySignals } from '../mocks/mockData';

export const runBacktest = async (payload) => {
  if (USE_MOCK_API) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          ...mockBacktestResult,
          strategyName: payload.strategyName,
          symbol: payload.symbol,
        });
      }, 500);
    });
  }

  const response = await axiosClient.post('/backtest', payload);
  return response.data;
};

export const runReplay = async (payload) => {
  if (USE_MOCK_API) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          sessionId: `session-${Date.now()}`,
          strategyName: payload.strategyName,
          symbol: payload.symbol,
          signals: replaySignals,
        });
      }, 300);
    });
  }

  const response = await axiosClient.post('/replay', payload);
  return response.data;
};
