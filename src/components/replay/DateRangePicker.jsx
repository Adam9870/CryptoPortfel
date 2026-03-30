function DateRangePicker({ startDate, endDate, onStartDateChange, onEndDateChange }) {
  return (
    <div className="date-range-grid">
      <div className="form-group">
        <label>Data od</label>
        <input type="date" value={startDate} onChange={(e) => onStartDateChange(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Data do</label>
        <input type="date" value={endDate} onChange={(e) => onEndDateChange(e.target.value)} />
      </div>
    </div>
  );
}

export default DateRangePicker;
