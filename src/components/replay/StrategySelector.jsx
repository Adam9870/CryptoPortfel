import { STRATEGIES } from '../../utils/constants';

function StrategySelector({ value, onChange }) {
  return (
    <div className="form-group">
      <label>Strategia</label>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {STRATEGIES.map((strategy) => (
          <option key={strategy} value={strategy}>{strategy}</option>
        ))}
      </select>
    </div>
  );
}

export default StrategySelector;
