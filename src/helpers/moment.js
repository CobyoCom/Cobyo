import moment from 'moment';

const databaseDateFormat = 'YYYY-MM-DD HH:mm';

export function formatDateForDatabase(timestamp = []) {
  return moment(timestamp).format(databaseDateFormat);
}