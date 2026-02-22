const dateOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };

/**
 * Format date as dd/mm/yyyy
 * @param {Date|string|number} date - Date to format
 * @returns {string}
 */
export function formatDate(date) {
  return new Date(date).toLocaleDateString('en-GB', dateOptions);
}

/**
 * Format date as dd/mm/yyyy / time (HH:mm:ss)
 * @param {Date|string|number} date - Date to format
 * @returns {string}
 */
export function formatDateTime(date) {
  const d = new Date(date);
  const dateStr = d.toLocaleDateString('en-GB', dateOptions);
  const timeStr = d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  return `${dateStr} / ${timeStr}`;
}
