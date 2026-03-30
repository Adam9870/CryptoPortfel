function LoadingSpinner({ text = 'Ładowanie...' }) {
  return (
    <div className="card centered-card">
      <div className="loading-dot" />
      <p>{text}</p>
    </div>
  );
}

export default LoadingSpinner;
