function ReplayControls({ mode = 'replay', onSubmit, submitting }) {
  return (
    <div className="button-row">
      <button type="button" onClick={onSubmit} disabled={submitting}>
        {submitting ? 'Trwa ładowanie...' : mode === 'replay' ? 'Uruchom Replay' : 'Uruchom Backtest'}
      </button>
    </div>
  );
}

export default ReplayControls;
