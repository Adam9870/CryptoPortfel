import { useEffect, useMemo, useRef, useState } from 'react';

const speedToDelay = {
  x1: 900,
  x5: 350,
  x10: 150,
};

export function useReplay(candles = [], speed = 'x1') {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const timerRef = useRef(null);

  const visibleCandles = useMemo(() => candles.slice(0, Math.max(currentIndex, 1)), [candles, currentIndex]);

  const stop = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsPlaying(false);
  };

  const play = () => {
    if (!candles.length || timerRef.current) return;
    setIsPlaying(true);
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= candles.length) {
          if (timerRef.current) clearInterval(timerRef.current);
          timerRef.current = null;
          setIsPlaying(false);
          return candles.length;
        }
        return prev + 1;
      });
    }, speedToDelay[speed] || 900);
  };

  const pause = () => {
    stop();
  };

  const reset = () => {
    stop();
    setCurrentIndex(1);
  };

  const stepForward = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, candles.length));
  };

  useEffect(() => {
    stop();
    setCurrentIndex(candles.length ? 1 : 0);
    return () => stop();
  }, [candles]);

  useEffect(() => {
    if (isPlaying) {
      stop();
      play();
    }
  }, [speed]);

  return {
    currentIndex,
    visibleCandles,
    isPlaying,
    play,
    pause,
    reset,
    stepForward,
    setCurrentIndex,
  };
}
