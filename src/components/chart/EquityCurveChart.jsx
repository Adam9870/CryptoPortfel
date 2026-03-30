import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

function EquityCurveChart({ equityCurve = [] }) {
  const data = equityCurve.map((value, index) => ({ step: index + 1, equity: value }));

  return (
    <div className="card chart-card small-chart-card">
      <h3>Equity Curve</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="step" stroke="#cbd5e1" />
          <YAxis stroke="#cbd5e1" />
          <Tooltip />
          <Line type="monotone" dataKey="equity" stroke="#60a5fa" strokeWidth={3} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default EquityCurveChart;
