import moment from 'moment';

const databaseDateFormat = 'YYYY-MM-DD HH:mm';

export function formatDateForDatabase(timestamp = []) {
  return moment(timestamp).format(databaseDateFormat);
}

export function addTime(units, start = null, key = 's') {
  const m = start ? moment(start) : moment();
  return m.add(units, key);
}
