import { SPEED_OPTIONS } from '../../utils/constants';

function SpeedSelector({ value, onChange }) {
  return (
    <div className="form-group">
      <label>Prędkość Replay</label>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {SPEED_OPTIONS.map((speed) => (
          <option key={speed} value={speed}>{speed}</option>
        ))}
      </select>
    </div>
  );
}

export default SpeedSelector;
