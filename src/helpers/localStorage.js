/**
 * Local storage helpers
 */

/**
 * Get item from local storage
 *
 * @param {string}  key
 * @param {boolean} parse
 *
 * @returns {boolean|object|string}
 */
export function getItem(key, parse = false) {
  const item = localStorage.getItem(key);
  if (!item) {
    return false;
  }

  return parse ? JSON.parse(item) : item;
}