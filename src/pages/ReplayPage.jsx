import { useState } from 'react';
import PageContainer from '../components/common/PageContainer';
import ReplayPanel from '../components/replay/ReplayPanel';
import ReplayPlayerControls from '../components/replay/ReplayPlayerControls';
import CandlesChart from '../components/chart/CandlesChart';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyState from '../components/backtest/EmptyState';
import Badge from '../components/common/Badge';
import { useMarketHistory } from '../hooks/useMarketHistory';
import { useReplay } from '../hooks/useReplay';
import { runReplay } from '../api/backtestApi';

function ReplayPage() {
  const { candles, loading, error, loadCandles } = useMarketHistory();
  const [signals, setSignals] = useState([]);
  const [sessionMeta, setSessionMeta] = useState(null);
  const [speed, setSpeed] = useState('x1');
  const replay = useReplay(candles, speed);

  const handleStartReplay = async (payload) => {
    setSpeed(payload.speed);
    const loadedCandles = await loadCandles(payload);
    const replayData = await runReplay(payload);
    setSignals(replayData?.signals || []);
    setSessionMeta({
      sessionId: replayData?.sessionId,
      strategyName: payload.strategyName,
      symbol: payload.symbol,
      candleCount: loadedCandles.length,
    });
  };

  return (
    <PageContainer
      title="Replay System"
      subtitle="Bar replay świeca po świecy z kontrolą prędkości i sygnałami strategii."
      actions={sessionMeta ? <Badge variant="success">Sesja aktywna</Badge> : null}
    >
      <div className="replay-layout">
        <ReplayPanel onSubmit={handleStartReplay} mode="replay" submitting={loading} />

        <div className="results-stack">
          {sessionMeta && (
            <div className="card session-summary">
              <h3>Aktywna sesja replay</h3>
              <p><strong>Symbol:</strong> {sessionMeta.symbol}</p>
              <p><strong>Strategia:</strong> {sessionMeta.strategyName}</p>
              <p><strong>Liczba świec:</strong> {sessionMeta.candleCount}</p>
              <p><strong>Session ID:</strong> {sessionMeta.sessionId}</p>
            </div>
          )}

          <ReplayPlayerControls
            isPlaying={replay.isPlaying}
            onPlay={replay.play}
            onPause={replay.pause}
            onReset={replay.reset}
            onStep={replay.stepForward}
            speed={speed}
            onSpeedChange={setSpeed}
            disabled={!candles.length}
          />

          {loading && <LoadingSpinner text="Pobieram świece i uruchamiam replay..." />}
          {error && <p className="error-text">Błąd: {error}</p>}

          {!loading && !candles.length && (
            <EmptyState
              title="Replay jeszcze nie uruchomiony"
              description="Wybierz dane wejściowe i uruchom replay, aby zobaczyć wykres świecowy i sterowanie odtwarzaniem."
            />
          )}

          {!!candles.length && !loading && (
            <CandlesChart
              candles={replay.visibleCandles}
              signals={signals}
              currentIndex={replay.currentIndex}
            />
          )}
        </div>
      </div>
    </PageContainer>
  );
}

export default ReplayPage;
