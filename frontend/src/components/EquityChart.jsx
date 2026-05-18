// wykres ktory uzywa recharts zeby narysowac jak zachowywala sie nasza kasa w czasie
import React from 'react';
import { ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { motion } from 'framer-motion';

export default function EquityChart({ equityCurve, candles }) {
  if (!candles || candles.length === 0) return null;

  // Map data to combine Price and Equity
  const data = candles.map((candle, index) => {
    const point = { time: index, price: candle.close };
    if (equityCurve && equityCurve[index] !== undefined) {
      point.equity = equityCurve[index];
    }
    return point;
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="glass-panel p-6 rounded-2xl h-[450px] flex flex-col"
    >
      <h3 className="text-xl font-bold mb-6 text-slate-100 flex items-center gap-3">
        <span className="w-2 h-6 bg-gradient-to-b from-blue-400 to-indigo-600 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></span>
        Performance Overview
      </h3>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 5, right: 0, bottom: 5, left: 0 }}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis dataKey="time" stroke="#475569" tick={{ fill: '#94a3b8', fontSize: 12 }} tickLine={false} axisLine={false} />
            <YAxis yAxisId="left" stroke="#8b5cf6" domain={['auto', 'auto']} tick={{ fill: '#8b5cf6', fontSize: 12 }} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val.toFixed(0)}`} />
            {equityCurve && (
              <YAxis yAxisId="right" orientation="right" stroke="#0ea5e9" domain={['auto', 'auto']} tick={{ fill: '#0ea5e9', fontSize: 12 }} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val.toFixed(0)}`} />
            )}
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', backdropFilter: 'blur(8px)', borderColor: '#1e293b', borderRadius: '12px', color: '#f8fafc', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)' }}
              itemStyle={{ fontWeight: 600 }}
              formatter={(value, name) => [`$${value.toFixed(2)}`, name]}
              labelStyle={{ color: '#94a3b8', marginBottom: '8px' }}
            />
            <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: '14px', color: '#cbd5e1' }} />
            <Area yAxisId="left" type="monotone" dataKey="price" name="Asset Price" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#colorPrice)" activeDot={{ r: 6, fill: '#8b5cf6', stroke: '#fff', strokeWidth: 2 }} />
            {equityCurve && (
              <Line yAxisId="right" type="monotone" dataKey="equity" name="Portfolio Equity" stroke="#0ea5e9" strokeWidth={3} dot={false} activeDot={{ r: 6, fill: '#0ea5e9', stroke: '#fff', strokeWidth: 2 }} />
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
