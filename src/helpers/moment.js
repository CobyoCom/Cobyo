/**
 * Moment helper functions
 */

import moment from 'moment';

/**
 * Default date format represented in the database.
 *
 * @type {string}
 */
const DB_DATE_FORMAT = 'YYYY-MM-DD HH:mm';

/**
 * Given a timestamp, output a formatted date string.
 *
 * @param {string} timestamp
 * @param {string} format
 *
 * @returns {string}
 */
export function formatDate(timestamp, format = DB_DATE_FORMAT) {
  if (!timestamp) {
    return '';
  }

  return moment(new Date(timestamp)).format(format);
}

/**
 * Given a timestamp, output a formatted calendar selected string.
 *
 * @param {string} timestamp
 *
 * @returns {string}
 */
export function formatCalendar(timestamp) {
  return moment(timestamp).calendar(null, {
    sameDay: 'h:mm a',
    nextDay: '[Tomorrow at ] h:mm a',
    nextWeek: 'dddd h:mm a',
    lastDay: '[Yesterday]',
    lastWeek: '[Last] dddd',
    sameElse: '[-]'
  });
}

/**
 * Add to given start time, output a formatted date string.
 *
 * @param {int}    units
 * @param {string} start
 * @param {string} key
 * @param {string} format
 *
 * @returns {string}
 */
export function addTime(units, start = null, key = 's', format = DB_DATE_FORMAT) {
  const m = start ? moment(new Date(start)) : moment();
  return m.add(units, key).format(format);
}

/**
 * Calculates the date difference and outputs a human readable string to describe the difference.
 *
 * @param {string} start
 *
 * @returns {string}
 */
export function fromNow(start) {
  if (!start) {
    return '-';
  }

  const seconds = moment().diff(new Date(start)) / 1000;
  if (seconds < 60) {
    return 'Just now';
  } else if (seconds < 120) {
    return '1 minute ago';
  } else if (seconds < 3600) {
    return `${Math.floor(seconds / 60)} minutes ago`;
  }

  return 'A while ago';
}