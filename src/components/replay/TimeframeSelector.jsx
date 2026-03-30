import { TIMEFRAMES } from '../../utils/constants';

function TimeframeSelector({ value, onChange }) {
  return (
    <div className="form-group">
      <label>Timeframe</label>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {TIMEFRAMES.map((tf) => (
          <option key={tf} value={tf}>{tf}</option>
        ))}
      </select>
    </div>
  );
}

export default TimeframeSelector;
