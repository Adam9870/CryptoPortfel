import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import HomePage from './pages/HomePage';
import ReplayPage from './pages/ReplayPage';
import BacktestPage from './pages/BacktestPage';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/replay" element={<ReplayPage />} />
        <Route path="/backtest" element={<BacktestPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
