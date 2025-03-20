const DateTimePicker = ({
    selectedDate,
    selectedHour,
    selectedMinute,
    onDateChange,
    onHourChange,
    onMinuteChange,
    isLaterSelected,
    onNowClick,
    onLaterClick,
  }) => (
    <div className="flex items-center gap-2 mt-4">
      <button
        className={`px-4 py-2 rounded-lg ${
          !isLaterSelected ? "bg-blue-600 text-white" : "bg-blue-300 text-black"
        }`}
        onClick={onNowClick}
      >
        Now
      </button>
      <button
        className={`px-4 py-2 rounded-lg ${
          isLaterSelected ? "bg-blue-600 text-white" : "bg-blue-300 text-black"
        }`}
        onClick={onLaterClick}
      >
        Later
      </button>
      <input type="date" className="p-2 border rounded-lg" value={selectedDate} onChange={(e) => onDateChange(e.target.value)} />
      <select className="p-2 border rounded-lg" value={selectedHour} onChange={(e) => onHourChange(e.target.value)}>
        {[...Array(24)].map((_, i) => (
          <option key={i} value={i}>
            {i}
          </option>
        ))}
      </select>
      <p className="text-gray-800">:</p>
      <select className="p-2 border rounded-lg" value={selectedMinute} onChange={(e) => onMinuteChange(e.target.value)}>
        {[...Array(12)].map((_, i) => {
          const value = i * 5;
          return (
            <option key={value} value={value}>
              {value.toString().padStart(2, "0")}
            </option>
          );
        })}
      </select>
    </div>
  );
  
  export default DateTimePicker;
  