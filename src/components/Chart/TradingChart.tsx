import { createChart, CandlestickSeries } from "lightweight-charts";
import { useEffect, useRef } from "react";

const TradingChart = () => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      width: 800,
      height: 400,
    });

    const candlestickSeries = chart.addSeries(CandlestickSeries);

    candlestickSeries.setData([
      {
        time: "2024-01-01",
        open: 100,
        high: 110,
        low: 90,
        close: 105,
      },
    ]);

    return () => {
      chart.remove();
    };
  }, []);

  return <div ref={chartContainerRef} />;
};

export default TradingChart;