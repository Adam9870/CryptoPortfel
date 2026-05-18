import React, { useState, useEffect } from 'react';
import apiService from './services/api';
import MetricsCards from './components/MetricsCards';
import EquityChart from './components/EquityChart';
import TradeHistory from './components/TradeHistory';
import BacktestForm from './components/BacktestForm';
import { LineChart, AlertCircle, History } from 'lucide-react';
import { motion } from 'framer-motion';

export default function App() {
  // glowny kontener apki trzyma stan i spina frontend z backendem
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeCandles, setActiveCandles] = useState([]);

  useEffect(() => {
    apiService.fetchBinanceData('BTCUSDT', '1d', 200)
      .then(candles => setActiveCandles(candles))
      .catch(err => console.error("Failed to fetch initial real data", err));
  }, []);

  const handleRunBacktest = async ({ strategy, candleCount, commission, stopLoss, takeProfit }) => {
    setLoading(true);
    setError(null);
    try {
      const liveCandles = await apiService.fetchBinanceData('BTCUSDT', '1d', candleCount);
      setActiveCandles(liveCandles);

      const requestData = {
        strategy: strategy,
        rsiPeriod: 14,
        smaFast: 10,
        smaSlow: 30,
        macdFast: 12,
        macdSlow: 26,
        macdSignal: 9,
        candles: liveCandles,
        commissionPercent: commission,
        stopLossPercent: stopLoss,
        takeProfitPercent: takeProfit
      };

      const data = await apiService.runBacktest(requestData);
      setResult(data);
    } catch (err) {
      setError('Failed to connect to the backend server. Make sure Spring Boot is running on port 8080.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 xl:p-12 max-w-[1600px] mx-auto font-sans relative">
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] bg-blue-500/20 blur-[120px] rounded-full pointer-events-none -z-10"></div>

      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12 pb-8 border-b border-slate-800/60 relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-5"
        >
          <div className="p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-[0_0_30px_rgba(59,130,246,0.3)] relative">
            <div className="absolute inset-0 rounded-2xl border border-white/20"></div>
            <LineChart size={36} className="text-white drop-shadow-md" />
          </div>
          <div>
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 tracking-tight">Crypto Analyzer Pro</h1>
            <p className="text-slate-400 mt-2 text-sm md:text-base font-medium tracking-wide uppercase">Institutional Grade Strategy Backtesting</p>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex gap-4"
        >
            <a href="http://localhost:8080/api/test" target="_blank" rel="noreferrer" className="text-sm font-semibold flex items-center gap-2 px-6 py-3 bg-slate-900/50 hover:bg-slate-800 border border-slate-700/80 rounded-xl text-slate-300 transition-all shadow-lg hover:shadow-blue-500/10 hover:border-blue-500/30 backdrop-blur-md">
              Test API Connection
            </a>
        </motion.div>
      </header>

      <main className="pb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <BacktestForm onRun={handleRunBacktest} loading={loading} />
        </motion.div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-950/40 border border-red-500/50 text-red-400 p-5 rounded-2xl mb-10 flex items-center gap-4 shadow-[0_0_20px_rgba(239,68,68,0.15)] backdrop-blur-md"
          >
            <div className="p-2 bg-red-500/20 rounded-full">
              <AlertCircle className="shrink-0" size={24} />
            </div>
            <p className="font-medium">{error}</p>
          </motion.div>
        )}

        <div className="space-y-10">
          {result && <MetricsCards result={result} />}
          
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-2 flex flex-col">
              <EquityChart equityCurve={result?.equityCurve} candles={activeCandles} />
            </div>
            <div className="xl:col-span-1 flex flex-col">
              {result && <TradeHistory trades={result.tradeHistory} />}
              {!result && (
                <div className="glass-panel rounded-2xl h-[450px] flex flex-col items-center justify-center p-8 text-center border-dashed border-slate-700/50">
                  <div className="p-4 bg-slate-800/50 rounded-full mb-4">
                    <History size={32} className="text-slate-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-300 mb-2">No Trades Yet</h3>
                  <p className="text-slate-500 text-sm">Configure your strategy parameters above and click "Run Analysis" to view trade history.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
