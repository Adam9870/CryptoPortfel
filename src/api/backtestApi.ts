import axios from "axios";
import type { BacktestResult } from "../types/BacktestResult";

export const runBacktest = async (payload: any): Promise<BacktestResult> => {
  const response = await axios.post("/api/backtest", payload);
  return response.data;
};