import { formatDateTime, formatMoney } from '../../utils/formatters';
import Badge from '../common/Badge';

function TradesTable({ trades = [] }) {
  return (
    <div className="card table-wrapper">
      <h3>Historia transakcji</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Typ</th>
            <th>Entry</th>
            <th>Exit</th>
            <th>Profit</th>
            <th>Opened</th>
            <th>Closed</th>
          </tr>
        </thead>
        <tbody>
          {trades.map((trade) => (
            <tr key={trade.id}>
              <td>{trade.id}</td>
              <td>
                <Badge variant={trade.type === 'BUY' ? 'success' : 'warning'}>{trade.type}</Badge>
              </td>
              <td>{formatMoney(trade.entryPrice)}</td>
              <td>{formatMoney(trade.exitPrice)}</td>
              <td className={trade.profit >= 0 ? 'profit-positive' : 'profit-negative'}>
                {formatMoney(trade.profit)}
              </td>
              <td>{formatDateTime(trade.openedAt)}</td>
              <td>{formatDateTime(trade.closedAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TradesTable;
