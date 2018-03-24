/**
 * Moment helper functions
 */
import moment from 'moment';

/**
 * Given a timestamp, output a formatted date string.
 *
 * @param {string} timestamp
 * @param {string} format
 *
 * @returns {string}
 */
export function formatDate(timestamp, format) {
  return !!timestamp ? moment(new Date(timestamp)).format(format) : '';
}

/**
 * Given a timestamp, output a formatted calendar selected string.
 *
 * @param {int} time Time represented in milliseconds
 *
 * @returns {string}
 */
export function formatCalendar(time) {
  return moment(time).calendar(null, {
    sameDay: 'h:mm a',
    nextDay: '[Tomorrow at ] h:mm a',
    nextWeek: 'dddd h:mm a',
    lastDay: '[Yesterday]',
    lastWeek: '[Last] dddd',
    sameElse: '[-]'
  });
}

/**
 * Calculates the date difference and outputs a human readable string to describe the difference.
 *
 * @param {int} time Time represented in milliseconds
 *
 * @returns {string}
 */
export function fromNow(time) {
  if (!time) {
    return '-';
  }

  const now = (new Date()).getTime();
  const seconds = (now - time) / 1000;

  if (seconds < 60) {
    return 'Just now';
  } else if (seconds < 120) {
    return '1 minute ago';
  } else if (seconds < 3600) {
    return `${Math.floor(seconds / 60)} minutes ago`;
  }

  return `A while ago`;
}

/**
 *
 * @param startTime
 * @param change
 * @param key
 * @returns {number}
 */
export function add(startTime = 0, change = 0, key = 'd') {
  const start = startTime ? moment(startTime) : moment();

  return start.add(change, key).valueOf();
}