import { useState, useEffect } from 'react';
import { formatDate, formatDateTime } from '../utils/formatDateTime.js';

/**
 * Responsive date/time display:
 * - Mobile: date only (dd/mm/yyyy)
 * - Desktop (md+): full date / time
 * Updates every second.
 */
function DateTimeDisplay() {
  const [currentDateTime, setCurrentDateTime] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-slate-600 font-medium text-sm md:text-base tabular-nums">
      <span className="md:hidden">{formatDate(currentDateTime)}</span>
      <span className="hidden md:inline">{formatDateTime(currentDateTime)}</span>
    </div>
  );
}

export default DateTimeDisplay;
