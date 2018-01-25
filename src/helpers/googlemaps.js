import loadGoogleMapsAPI from 'load-google-maps-api';

export const API_KEY = 'AIzaSyBnlBl_1F9FuifQlfJeQQ6-nq1fF4KsDvw';

export function init() {
  return loadGoogleMapsAPI({
    key: API_KEY,
    libraries: ['places']
  });
}

export function getErrorMessage(status) {
  switch(status) {
    case 'INVALID_REQUEST':
      return 'Request invalid. Please notify the site maintainers.';
    case 'OVER_QUERY_LIMIT':
      return 'The site maintainers have ran over their query limit with Google and need to pay them $$$ to continue.';
    case 'REQUEST_DENIED':
      return 'Request denied. Please notify the site maintainers.';
    case 'NOT FOUND':
      return 'Location was not found. Please try again.';
    case 'ZERO_RESULTS':
      return 'There were no results. Please try again.';
    case 'UNKNOWN_ERROR':
    default:
      return 'There was an unknown error. Please notify the site maintainers.';
  }
}