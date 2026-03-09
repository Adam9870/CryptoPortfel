import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReplayPage from "./pages/ReplayPage";
import BacktestPage from "./pages/BacktestPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ReplayPage />} />
        <Route path="/backtest" element={<BacktestPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;