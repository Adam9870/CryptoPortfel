import StatCard from '../common/StatCard';
import { formatPercent, formatNumber } from '../../utils/formatters';

function BacktestMetrics({ result }) {
  return (
    <div className="card-grid metrics-grid">
      <StatCard label="ROI" value={formatPercent(result.roi)} hint="Zwrot z inwestycji" />
      <StatCard label="Max Drawdown" value={formatPercent(result.maxDrawdown)} hint="Największy spadek kapitału" />
      <StatCard label="Win Rate" value={formatPercent(result.winRate)} hint="Odsetek udanych transakcji" />
      <StatCard label="Profit Factor" value={formatNumber(result.profitFactor)} hint="Zysk brutto / strata brutto" />
    </div>
  );
}

export default BacktestMetrics;
