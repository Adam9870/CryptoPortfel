// kafelki z wynikami typu roi czy win rate zeby od razu bylo widac czy strategia dziala
import React from 'react';
import { Activity, TrendingUp, Percent, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MetricsCards({ result }) {
  if (!result) return null;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
    >
      <motion.div variants={item} className="glass-panel p-6 rounded-2xl flex items-center gap-5 transition-all hover:scale-105 hover:bg-slate-800/80 group">
        <div className="p-4 bg-blue-500/10 rounded-xl text-blue-400 group-hover:bg-blue-500/20 group-hover:text-blue-300 transition-colors shadow-[0_0_15px_rgba(59,130,246,0.15)] group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]">
          <TrendingUp size={28} />
        </div>
        <div>
          <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-1">Total ROI</p>
          <h4 className="text-3xl font-bold text-white tracking-tight">{result.roi.toFixed(2)}%</h4>
        </div>
      </motion.div>
      
      <motion.div variants={item} className="glass-panel p-6 rounded-2xl flex items-center gap-5 transition-all hover:scale-105 hover:bg-slate-800/80 group">
        <div className="p-4 bg-red-500/10 rounded-xl text-red-400 group-hover:bg-red-500/20 group-hover:text-red-300 transition-colors shadow-[0_0_15px_rgba(239,68,68,0.15)] group-hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]">
          <Activity size={28} />
        </div>
        <div>
          <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-1">Max Drawdown</p>
          <h4 className="text-3xl font-bold text-white tracking-tight">{result.maxDrawdown.toFixed(2)}%</h4>
        </div>
      </motion.div>

      <motion.div variants={item} className="glass-panel p-6 rounded-2xl flex items-center gap-5 transition-all hover:scale-105 hover:bg-slate-800/80 group">
        <div className="p-4 bg-emerald-500/10 rounded-xl text-emerald-400 group-hover:bg-emerald-500/20 group-hover:text-emerald-300 transition-colors shadow-[0_0_15px_rgba(16,185,129,0.15)] group-hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]">
          <Percent size={28} />
        </div>
        <div>
          <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-1">Win Rate</p>
          <h4 className="text-3xl font-bold text-white tracking-tight">{result.winRate.toFixed(2)}%</h4>
        </div>
      </motion.div>

      <motion.div variants={item} className="glass-panel p-6 rounded-2xl flex items-center gap-5 transition-all hover:scale-105 hover:bg-slate-800/80 group">
        <div className="p-4 bg-purple-500/10 rounded-xl text-purple-400 group-hover:bg-purple-500/20 group-hover:text-purple-300 transition-colors shadow-[0_0_15px_rgba(168,85,247,0.15)] group-hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]">
          <DollarSign size={28} />
        </div>
        <div>
          <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-1">Profit Factor</p>
          <h4 className="text-3xl font-bold text-white tracking-tight">{result.profitFactor === 999 ? 'MAX' : result.profitFactor.toFixed(2)}</h4>
        </div>
      </motion.div>
    </motion.div>
  );
}
