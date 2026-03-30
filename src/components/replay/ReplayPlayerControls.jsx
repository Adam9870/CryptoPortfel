function ReplayPlayerControls({ isPlaying, onPlay, onPause, onReset, onStep, speed, onSpeedChange, disabled }) {
  return (
    <div className="card replay-player-controls">
      <div className="button-row wrap-row">
        <button onClick={onPlay} disabled={disabled || isPlaying}>Play</button>
        <button onClick={onPause} disabled={disabled || !isPlaying}>Pause</button>
        <button onClick={onStep} disabled={disabled}>Krok dalej</button>
        <button onClick={onReset} disabled={disabled}>Reset</button>
      </div>
      <div className="mini-inline-control">
        <label>Prędkość</label>
        <select value={speed} onChange={(e) => onSpeedChange(e.target.value)} disabled={disabled}>
          <option value="x1">x1</option>
          <option value="x5">x5</option>
          <option value="x10">x10</option>
        </select>
      </div>
    </div>
  );
}

export default ReplayPlayerControls;
