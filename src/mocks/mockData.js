function seededRandom(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function generateMockCandles({ startDate = '2024-01-01', count = 80, basePrice = 42000 }) {
  const candles = [];
  let lastClose = basePrice;
  const start = new Date(startDate).getTime();

  for (let i = 0; i < count; i += 1) {
    const drift = (seededRandom(i + 1) - 0.48) * 1400;
    const open = lastClose;
    const close = Math.max(1000, open + drift);
    const high = Math.max(open, close) + seededRandom(i + 2) * 500;
    const low = Math.min(open, close) - seededRandom(i + 3) * 500;
    const volume = 10 + seededRandom(i + 4) * 30;

    candles.push({
      time: new Date(start + i * 3600 * 1000).toISOString(),
      open: Number(open.toFixed(2)),
      high: Number(high.toFixed(2)),
      low: Number(low.toFixed(2)),
      close: Number(close.toFixed(2)),
      volume: Number(volume.toFixed(2)),
    });

    lastClose = close;
  }

  return candles;
}

export const mockTrades = [
  {
    id: 1,
    type: 'BUY',
    entryPrice: 42000,
    exitPrice: 43600,
    profit: 1600,
    openedAt: '2024-01-10T10:00:00',
    closedAt: '2024-01-10T18:00:00',
  },
  {
    id: 2,
    type: 'SELL',
    entryPrice: 44000,
    exitPrice: 43100,
    profit: 900,
    openedAt: '2024-01-18T09:00:00',
    closedAt: '2024-01-18T16:00:00',
  },
  {
    id: 3,
    type: 'BUY',
    entryPrice: 42850,
    exitPrice: 42150,
    profit: -700,
    openedAt: '2024-01-22T08:00:00',
    closedAt: '2024-01-22T12:00:00',
  },
];

export const mockBacktestResult = {
  roi: 18.4,
  maxDrawdown: 7.2,
  winRate: 58.3,
  profitFactor: 1.71,
  equityCurve: [10000, 10150, 10320, 10180, 10550, 10410, 10890, 11120, 11840],
  trades: mockTrades,
};

export const replaySignals = [
  { index: 10, type: 'BUY' },
  { index: 24, type: 'SELL' },
  { index: 41, type: 'BUY' },
  { index: 58, type: 'SELL' },
];
