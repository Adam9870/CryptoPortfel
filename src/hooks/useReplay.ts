import { useState, useRef } from "react"
import type { Candle } from "../types/Candle"

export const useReplay = (candles: Candle[]) => {
  const [index, setIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(1)

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const play = () => {
    if (intervalRef.current || candles.length === 0) return
    setIsPlaying(true)
    intervalRef.current = setInterval(() => {
      setIndex((prev) => {
        if (prev >= candles.length - 1) {
          pause()
          return prev
        }
        return prev + 1
      })
    }, 1000 / speed)
  }

  const pause = () => {
    setIsPlaying(false)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  const reset = () => {
    pause()
    setIndex(0)
  }

  const setReplaySpeed = (newSpeed: number) => {
    setSpeed(newSpeed)
    if (isPlaying) {
      pause()
      play()
    }
  }

  return {
    currentCandles: candles.slice(0, index + 1),
    play,
    pause,
    reset,
    setSpeed: setReplaySpeed,
    isPlaying,
  }
}