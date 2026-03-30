import PageContainer from '../components/common/PageContainer';
import ReplayPanel from '../components/replay/ReplayPanel';
import BacktestMetrics from '../components/backtest/BacktestMetrics';
import TradesTable from '../components/backtest/TradesTable';
import EquityCurveChart from '../components/chart/EquityCurveChart';
import EmptyState from '../components/backtest/EmptyState';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useBacktest } from '../hooks/useBacktest';

function BacktestPage() {
  const { result, loading, error, executeBacktest } = useBacktest();

  return (
    <PageContainer
      title="Backtest Results"
      subtitle="Uruchamianie backtestu i analiza wyników strategii tradingowej."
    >
      <ReplayPanel onSubmit={executeBacktest} mode="backtest" submitting={loading} />

      {loading && <LoadingSpinner text="Liczę wyniki strategii..." />}
      {error && <p className="error-text">Błąd: {error}</p>}

      {!loading && !result && (
        <EmptyState
          title="Brak wyników"
          description="Wybierz parametry i uruchom backtest, aby zobaczyć metryki, wykres kapitału i historię transakcji."
        />
      )}

      {result && !loading && (
        <div className="results-stack">
          <BacktestMetrics result={result} />
          <EquityCurveChart equityCurve={result.equityCurve} />
          <TradesTable trades={result.trades} />
        </div>
      )}
    </PageContainer>
  );
}

export default BacktestPage;
