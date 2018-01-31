import moment from 'moment';

const databaseDateFormat = 'YYYY-MM-DD HH:mm';

export function formatDateForDatabase(timestamp = []) {
  return moment(timestamp).format(databaseDateFormat);
}

export function addTime(units, start = null, key = 's') {
  const m = start ? moment(start) : moment();
  return m.add(units, key);
}

export function fromNow(start) {
  if (!start) {
    return '-';
  }

  const seconds = moment().diff(start) / 1000;
  if (seconds < 60) {
    return 'Just now';
  } else if (seconds < 120) {
    return '1 minute ago';
  } else if (seconds < 3600) {
    return `${Math.floor(seconds / 60)} minutes ago`;
  }

  return 'Gone fishing';
}