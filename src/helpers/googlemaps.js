import loadGoogleMapsAPI from 'load-google-maps-api';

const API_KEY = 'AIzaSyBnlBl_1F9FuifQlfJeQQ6-nq1fF4KsDvw';

export function init() {
  return loadGoogleMapsAPI({
    key: API_KEY,
    libraries: ['places']
  });
}