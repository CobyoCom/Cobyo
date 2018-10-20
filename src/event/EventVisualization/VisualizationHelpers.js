/**
 * Helper to get distance from millisecond time duration
 *
 * @param ms
 * @param min
 * @param zoom The further away people are, the smaller the zoom value should be
 *
 * @returns {number}
 */
export function getDistance({ ms, min = 0, zoom = 1 }) {
  const seconds = ms / 1000;
  const minutes = seconds / 60;
  return Math.max(min, minutes * zoom);
}

export function getSuggestedZoomLevel(ms) {

}