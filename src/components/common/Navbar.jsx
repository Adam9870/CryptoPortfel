import { Link, NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__brand">
        <Link to="/">CryptoPortfolio Pro</Link>
      </div>
      <div className="navbar__links">
        <NavLink to="/" className={({ isActive }) => (isActive ? 'active-link' : '')}>
          Home
        </NavLink>
        <NavLink to="/replay" className={({ isActive }) => (isActive ? 'active-link' : '')}>
          Replay
        </NavLink>
        <NavLink to="/backtest" className={({ isActive }) => (isActive ? 'active-link' : '')}>
          Backtest
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
