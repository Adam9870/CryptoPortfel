// formularz gdzie user wybiera strategie i ustawia parametry ryzyka podajemy to potem wyzej
import React, { useState } from 'react';
import { Play, Settings2, CandlestickChart, HelpCircle } from 'lucide-react';

const Tooltip = ({ text }) => (
  <div className="relative group/tooltip flex items-center">
    <HelpCircle size={14} className="text-slate-500 hover:text-blue-400 cursor-help transition-colors" />
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 p-3 bg-slate-800 text-slate-200 text-xs font-normal normal-case tracking-normal rounded-xl shadow-[0_10px_25px_-5px_rgba(0,0,0,0.5)] opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-50 border border-slate-700/80">
      {text}
      <div className="absolute top-full left-1/2 -translate-x-1/2 border-[5px] border-transparent border-t-slate-700/80"></div>
    </div>
  </div>
);

export default function BacktestForm({ onRun, loading }) {
  const [strategy, setStrategy] = useState('macd');
  const [candleCount, setCandleCount] = useState(200);
  const [commission, setCommission] = useState(0.1);
  const [stopLoss, setStopLoss] = useState(2.0);
  const [takeProfit, setTakeProfit] = useState(4.0);

  const handleSubmit = (e) => {
    e.preventDefault();
    onRun({ strategy, candleCount, commission, stopLoss, takeProfit });
  };

  return (
    <form onSubmit={handleSubmit} className="glass-panel p-8 rounded-2xl mb-10 transition-all hover:shadow-2xl hover:shadow-blue-500/10 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

      <div className="flex items-center gap-3 mb-8">
        <div className="p-2.5 bg-slate-800/80 rounded-lg border border-slate-700/50 shadow-inner">
          <Settings2 size={24} className="text-blue-400" />
        </div>
        <h3 className="text-2xl font-bold text-white tracking-tight">Strategy Configuration</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="group">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wider relative">
            <CandlestickChart size={16} className="text-indigo-400" />
            Trading Strategy
            <Tooltip text="A strategy dictates when to buy and sell. For example, Moving Average Cross buys when a short-term average crosses above a long-term average." />
          </label>
          <div className="relative">
            <select 
              value={strategy} 
              onChange={(e) => setStrategy(e.target.value)}
              className="w-full appearance-none bg-slate-900/60 border border-slate-700/80 rounded-xl px-5 py-4 text-slate-100 font-medium focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all hover:bg-slate-900/80 cursor-pointer shadow-inner"
            >
              <option value="macd">MACD Strategy</option>
              <option value="rsi">RSI Strategy</option>
              <option value="stochastic">Stochastic Strategy</option>
              <option value="ma_cross">Moving Average Cross</option>
              <option value="multi">Multi Indicator Strategy</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-5 text-slate-400 group-hover:text-blue-400 transition-colors">
              <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>
        
        <div className="group">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wider relative">
            <CandlestickChart size={16} className="text-blue-400" />
            Historical Data (Candles)
            <Tooltip text="How much historical data to test on. More candles means testing further back in time." />
          </label>
          <input 
            type="number" 
            value={candleCount}
            onChange={(e) => setCandleCount(Number(e.target.value))}
            className="w-full bg-slate-900/60 border border-slate-700/80 rounded-xl px-5 py-4 text-slate-100 font-mono text-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all hover:bg-slate-900/80 shadow-inner"
            min="10"
            max="10000"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="group">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wider relative">
            Commission (%)
            <Tooltip text="The fee charged by the exchange on every trade. This eats into your profits." />
          </label>
          <input 
            type="number" 
            step="0.01"
            value={commission}
            onChange={(e) => setCommission(Number(e.target.value))}
            className="w-full bg-slate-900/60 border border-slate-700/80 rounded-xl px-5 py-4 text-slate-100 font-mono text-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all hover:bg-slate-900/80 shadow-inner"
          />
        </div>

        <div className="group">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wider relative">
            Stop Loss (%)
            <Tooltip text="A safety net that automatically sells your position if the price drops by this percentage, preventing bigger losses." />
          </label>
          <input 
            type="number" 
            step="0.1"
            value={stopLoss}
            onChange={(e) => setStopLoss(Number(e.target.value))}
            className="w-full bg-slate-900/60 border border-slate-700/80 rounded-xl px-5 py-4 text-slate-100 font-mono text-lg focus:ring-2 focus:ring-red-500/50 focus:border-red-500 outline-none transition-all hover:bg-slate-900/80 shadow-inner"
          />
        </div>

        <div className="group">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wider relative">
            Take Profit (%)
            <Tooltip text="Automatically sells your position when it reaches a certain profit percentage, locking in your gains." />
          </label>
          <input 
            type="number" 
            step="0.1"
            value={takeProfit}
            onChange={(e) => setTakeProfit(Number(e.target.value))}
            className="w-full bg-slate-900/60 border border-slate-700/80 rounded-xl px-5 py-4 text-slate-100 font-mono text-lg focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all hover:bg-slate-900/80 shadow-inner"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button 
          type="submit" 
          disabled={loading}
          className="w-full md:w-auto glass-button px-10 py-4 rounded-xl text-lg flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed group"
        >
          <Play size={22} className={`${loading ? "animate-pulse" : "group-hover:scale-110 transition-transform"} fill-current`} />
          {loading ? 'Executing Backtest...' : 'Run Analysis'}
        </button>
      </div>
    </form>
  );
}
