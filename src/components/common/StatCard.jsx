function StatCard({ label, value, hint }) {
  return (
    <div className="card stat-card">
      <span className="stat-card__label">{label}</span>
      <strong className="stat-card__value">{value}</strong>
      {hint && <small className="stat-card__hint">{hint}</small>}
    </div>
  );
}

export default StatCard;
