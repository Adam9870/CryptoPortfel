import { Link } from 'react-router-dom';
import Badge from '../components/common/Badge';
import PageContainer from '../components/common/PageContainer';

function HomePage() {
  return (
    <PageContainer
      title="CryptoPortfolio Pro MVP"
      subtitle="W pełni wykonany frontend osoby 4: Replay, Backtest, wykres świecowy, wyniki i mock API."
      actions={<Badge variant="info">React + Vite</Badge>}
    >
      <div className="hero-grid">
        <div className="card hero-card">
          <h2>Co działa w projekcie?</h2>
          <ul className="feature-list">
            <li>Panel Replay i Backtest</li>
            <li>Wybór symbolu, timeframe, zakresu dat i strategii</li>
            <li>Wykres świecowy z replay i sygnałami BUY/SELL</li>
            <li>Play / Pause / Krok dalej / Reset / Speed</li>
            <li>Metryki ROI, Max Drawdown, Win Rate, Profit Factor</li>
            <li>Equity Curve i historia transakcji</li>
          </ul>
          <div className="button-row wrap-row">
            <Link to="/replay" className="link-button">Przejdź do Replay</Link>
            <Link to="/backtest" className="link-button secondary-button">Przejdź do Backtestu</Link>
          </div>
        </div>

        <div className="card info-card">
          <h3>Jak uruchomić</h3>
          <pre className="code-block">npm install{`\n`}npm run dev</pre>
          <p>Domyślnie włączony jest mock API, więc frontend działa od razu bez backendu.</p>
        </div>
      </div>
    </PageContainer>
  );
}

export default HomePage;
