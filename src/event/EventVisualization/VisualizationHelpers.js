/**
 * Helper to get distance from millisecond time duration
 *
 * @param ms
 * @param min
 * @param zoom The further away people are, the smaller the zoom value should be
 *
 * @returns {number}
 */
export function getDistance({ ms, min = 0, zoom = 3 }) {
  const hours = ms / (3600 * 1000);
  return Math.max(min, hours * 100 * zoom);
}
