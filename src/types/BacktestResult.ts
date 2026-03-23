export interface TradeDto {
  entryPrice: number;
  exitPrice: number;
  profit: number;
  entryTime: string;
  exitTime: string;
}

export interface BacktestResult {
  roi: number;
  maxDrawdown: number;
  winRate: number;
  profitFactor: number;
  equityCurve: number[];
  trades: TradeDto[];
}