import { useState } from 'react';
import { DEFAULT_REPLAY_FORM } from '../../utils/constants';
import TimeframeSelector from './TimeframeSelector';
import StrategySelector from './StrategySelector';
import DateRangePicker from './DateRangePicker';
import SpeedSelector from './SpeedSelector';
import ReplayControls from './ReplayControls';

function ReplayPanel({ onSubmit, mode = 'replay', submitting = false, initialValues }) {
  const [form, setForm] = useState(initialValues || DEFAULT_REPLAY_FORM);
  const [error, setError] = useState('');

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    if (!form.symbol.trim()) return 'Symbol jest wymagany';
    if (!form.startDate || !form.endDate) return 'Zakres dat jest wymagany';
    if (form.startDate > form.endDate) return 'Data początkowa nie może być późniejsza niż końcowa';
    if (Number(form.initialBalance) <= 0) return 'Kapitał początkowy musi być większy od 0';
    return '';
  };

  const handleSubmit = () => {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError('');
    onSubmit({
      symbol: form.symbol.trim().toUpperCase(),
      timeframe: form.timeframe,
      startDate: form.startDate,
      endDate: form.endDate,
      strategyName: form.strategyName,
      initialBalance: Number(form.initialBalance),
      speed: form.speed,
      parameters: {
        rsiPeriod: 14,
        overbought: 70,
        oversold: 30,
        shortPeriod: 9,
        longPeriod: 21,
      },
    });
  };

  return (
    <div className="panel card">
      <h3>{mode === 'replay' ? 'Panel Replay' : 'Panel Backtestu'}</h3>
      {error && <p className="error-text">{error}</p>}

      <div className="form-group">
        <label>Symbol</label>
        <input
          type="text"
          value={form.symbol}
          onChange={(e) => updateField('symbol', e.target.value)}
          placeholder="BTCUSDT"
        />
      </div>

      <TimeframeSelector value={form.timeframe} onChange={(value) => updateField('timeframe', value)} />

      <DateRangePicker
        startDate={form.startDate}
        endDate={form.endDate}
        onStartDateChange={(value) => updateField('startDate', value)}
        onEndDateChange={(value) => updateField('endDate', value)}
      />

      <StrategySelector value={form.strategyName} onChange={(value) => updateField('strategyName', value)} />

      <div className="form-group">
        <label>Kapitał początkowy</label>
        <input
          type="number"
          value={form.initialBalance}
          onChange={(e) => updateField('initialBalance', e.target.value)}
        />
      </div>

      <SpeedSelector value={form.speed} onChange={(value) => updateField('speed', value)} />

      <ReplayControls mode={mode} onSubmit={handleSubmit} submitting={submitting} />
    </div>
  );
}

export default ReplayPanel;
