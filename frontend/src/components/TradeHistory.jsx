// tabela ktora wypisuje wszystkie transakcje kupna i sprzedazy krok po kroku
import React from 'react';
import { History } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TradeHistory({ trades }) {
  if (!trades || trades.length === 0) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="glass-panel rounded-2xl overflow-hidden h-[450px] flex flex-col"
    >
      <div className="p-6 border-b border-slate-800/80 bg-slate-900/40">
        <h3 className="text-xl font-bold text-slate-100 flex items-center gap-3">
          <History size={22} className="text-blue-400" />
          Trade Log
        </h3>
      </div>
      <div className="overflow-y-auto flex-1 custom-scrollbar bg-slate-900/20">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-950/50 text-xs uppercase sticky top-0 shadow-md border-b border-slate-800/80 backdrop-blur-md z-10">
            <tr>
              <th className="px-6 py-4 font-semibold tracking-wider text-slate-400">Action</th>
              <th className="px-6 py-4 font-semibold tracking-wider text-slate-400">Price</th>
              <th className="px-6 py-4 font-semibold tracking-wider text-slate-400 text-right">Bar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {trades.map((trade, i) => (
              <motion.tr 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.02 }}
                key={i} 
                className="hover:bg-slate-800/40 transition-colors group"
              >
                <td className="px-6 py-4">
                  <div className={`inline-flex items-center justify-center px-3 py-1 rounded-md text-xs font-bold tracking-wide border shadow-sm transition-all ${
                    trade.type === 'BUY' 
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 group-hover:bg-emerald-500/20 group-hover:border-emerald-500/40 shadow-emerald-500/10' 
                      : 'bg-red-500/10 text-red-400 border-red-500/20 group-hover:bg-red-500/20 group-hover:border-red-500/40 shadow-red-500/10'
                  }`}>
                    {trade.type}
                  </div>
                </td>
                <td className="px-6 py-4 font-mono text-slate-200">${trade.price.toFixed(2)}</td>
                <td className="px-6 py-4 text-slate-500 font-mono text-right">{trade.index}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
