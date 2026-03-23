// ...existing code...
import { useEffect, useRef } from "react"
import {
  createChart,
  type CandlestickSeriesOptions,
  type CandlestickData,
} from "lightweight-charts"
import type { Candle } from "../../types/Candle"

// ...existing code...

// inferring correct series API type from createChart to avoid version/type name mismatch
type ChartApi = ReturnType<typeof createChart>
type CandlestickSeriesApi = ReturnType<ChartApi["addCandlestickSeries"]>

interface Props {
  candles: Candle[]
}

const toCandlestickData = (c: any): CandlestickData => {
  // ...existing code...
}

// ...existing code...

const TradingChart = ({ candles }: Props) => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null)
  const seriesRef = useRef<CandlestickSeriesApi | null>(null)

  useEffect(() => {
    if (!chartContainerRef.current) return

    const chart = createChart(chartContainerRef.current, {
      width: 900,
      height: 500,
      layout: {
        background: { color: "#1e1e1e" },
        textColor: "#ffffff",
      },
      grid: {
        vertLines: { color: "#333" },
        horzLines: { color: "#333" },
      },
    })

    // typ jest teraz poprawnie inferowany
    seriesRef.current = chart.addCandlestickSeries({} as CandlestickSeriesOptions)

    return () => {
      chart.remove()
      seriesRef.current = null
    }
  }, [])

  // ...existing code...
}

export default TradingChart
// ...existing code...