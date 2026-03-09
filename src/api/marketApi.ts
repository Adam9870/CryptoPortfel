import axios from "axios";

export const getHistoricalData = async (
  symbol: string,
  timeframe: string
) => {
  const response = await axios.get(
    `/api/market/history/${symbol}?timeframe=${timeframe}`
  );
  return response.data;
};