export const USE_MOCK_API = true;

export const TIMEFRAMES = ['1m', '5m', '15m', '1h', '4h', '1d'];
export const SPEED_OPTIONS = ['x1', 'x5', 'x10'];
export const STRATEGIES = [
  'MovingAverageCrossStrategy',
  'RSIStrategy',
  'MACDStrategy',
  'MultiIndicatorStrategy',
];

export const DEFAULT_REPLAY_FORM = {
  symbol: 'BTCUSDT',
  timeframe: '1h',
  startDate: '2024-01-01',
  endDate: '2024-03-01',
  strategyName: 'RSIStrategy',
  initialBalance: 10000,
  speed: 'x1',
};
