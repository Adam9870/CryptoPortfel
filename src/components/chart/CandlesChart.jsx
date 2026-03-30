import Badge from '../common/Badge';

function getMinMax(candles) {
  const lows = candles.map((c) => c.low);
  const highs = candles.map((c) => c.high);
  return { min: Math.min(...lows), max: Math.max(...highs) };
}

function yScale(value, min, max, height, padding) {
  if (max === min) return height / 2;
  return padding + ((max - value) / (max - min)) * (height - padding * 2);
}

function CandlesChart({ candles = [], signals = [], currentIndex = 0 }) {
  if (!candles.length) {
    return (
      <div className="card chart-placeholder">
        <h3>Trading Chart</h3>
        <p>Najpierw uruchom replay, aby załadować dane świecowe.</p>
      </div>
    );
  }

  const width = 900;
  const height = 420;
  const padding = 30;
  const { min, max } = getMinMax(candles);
  const candleWidth = Math.max(6, (width - padding * 2) / candles.length - 4);

  return (
    <div className="card chart-card">
      <div className="chart-card__header">
        <div>
          <h3>Wykres świecowy</h3>
          <p>Bar replay świeca po świecy z zaznaczonymi sygnałami strategii.</p>
        </div>
        <Badge variant="info">Aktywna świeca: {currentIndex}</Badge>
      </div>

      <div className="svg-chart-wrapper">
        <svg viewBox={`0 0 ${width} ${height}`} className="svg-chart">
          <line x1="30" y1="20" x2="30" y2="390" stroke="#475569" />
          <line x1="30" y1="390" x2="870" y2="390" stroke="#475569" />

          {candles.map((candle, index) => {
            const x = padding + index * ((width - padding * 2) / candles.length);
            const openY = yScale(candle.open, min, max, height, padding);
            const closeY = yScale(candle.close, min, max, height, padding);
            const highY = yScale(candle.high, min, max, height, padding);
            const lowY = yScale(candle.low, min, max, height, padding);
            const bodyY = Math.min(openY, closeY);
            const bodyHeight = Math.max(2, Math.abs(closeY - openY));
            const bullish = candle.close >= candle.open;
            const signal = signals.find((item) => item.index === index);

            return (
              <g key={`${candle.time}-${index}`}>
                <line x1={x} y1={highY} x2={x} y2={lowY} stroke={bullish ? '#22c55e' : '#ef4444'} strokeWidth="2" />
                <rect
                  x={x - candleWidth / 2}
                  y={bodyY}
                  width={candleWidth}
                  height={bodyHeight}
                  fill={bullish ? '#22c55e' : '#ef4444'}
                  opacity={index + 1 === currentIndex ? 1 : 0.85}
                  stroke={index + 1 === currentIndex ? '#f8fafc' : 'none'}
                  strokeWidth={index + 1 === currentIndex ? 1.5 : 0}
                />
                {signal && (
                  <>
                    <circle cx={x} cy={signal.type === 'BUY' ? lowY + 18 : highY - 18} r="8" fill={signal.type === 'BUY' ? '#3b82f6' : '#f59e0b'} />
                    <text
                      x={x}
                      y={signal.type === 'BUY' ? lowY + 22 : highY - 14}
                      textAnchor="middle"
                      fontSize="10"
                      fill="#fff"
                    >
                      {signal.type === 'BUY' ? 'B' : 'S'}
                    </text>
                  </>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

export default CandlesChart;
