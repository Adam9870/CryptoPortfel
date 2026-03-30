export const formatPercent = (value) => `${Number(value ?? 0).toFixed(2)}%`;
export const formatMoney = (value) => `$${Number(value ?? 0).toFixed(2)}`;
export const formatNumber = (value) => Number(value ?? 0).toFixed(2);
export const formatDateTime = (value) => {
  if (!value) return '-';
  return new Date(value).toLocaleString('pl-PL');
};
