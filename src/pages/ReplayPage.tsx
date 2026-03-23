import { useState } from "react"
import TradingChart from "../components/Chart/TradingChart"
import { useReplay } from "../hooks/useReplay"
import ReplayControls from "../components/ReplayControls/ReplayControls"
import type { Candle } from "../types/Candle"

const ReplayPage = () => {
  const [candles] = useState<Candle[]>([
    { time: "2024-01-01", open: 100, high: 110, low: 90, close: 105 },
    { time: "2024-01-02", open: 105, high: 115, low: 100, close: 110 },
    { time: "2024-01-03", open: 110, high: 120, low: 105, close: 115 },
    { time: "2024-01-04", open: 115, high: 125, low: 110, close: 120 },
  ])

  const replay = useReplay(candles)

  return (
    <div style={{ padding: "20px", backgroundColor: "#1e1e1e", color: "#fff" }}>
      <h1>Market Replay</h1>
      <TradingChart candles={replay.currentCandles} />
      <ReplayControls
        play={replay.play}
        pause={replay.pause}
        setSpeed={replay.setSpeed}
      />
    </div>
  )
}

export default ReplayPage