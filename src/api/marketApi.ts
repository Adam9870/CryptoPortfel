import axios from "axios"
import type { Candle } from "../types/Candle"

export const getHistoricalData = async (
  symbol: string,
  timeframe: string
): Promise<Candle[]> => {

  const response = await axios.get(
    `/api/market/history/${symbol}?timeframe=${timeframe}`
  )

  return response.data
}