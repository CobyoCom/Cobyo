/*global google*/

import {init} from '../helpers/googlemaps';
import logger from '../helpers/logger';

export const types = {
  initGoogleMapsAPISuccess: 'INIT_GOOGLE_MAPS_API_SUCCESS',
  initGoogleMapsAPIFailure: 'INIT_GOOGLE_MAPS_API_FAILURE'
};

function initGoogleMapsAPISuccess() {
  return {type: types.initGoogleMapsAPISuccess};
}

function initGoogleMapsAPIFailure() {
  return {type: types.initGoogleMapsAPIFailure};
}

export function initGoogleMapsAPI() {
  return async dispatch => {
    try {
      await init();
      dispatch(initGoogleMapsAPISuccess());

      return Promise.resolve();
    } catch (error) {
      logger(`Failed to load Google Maps API: ${error}`);
      dispatch(initGoogleMapsAPIFailure());

      return Promise.reject();
    }
  };
}

export function geocodeMap(geocoder, map, placeId) {
  return new Promise((resolve, reject) => {
    return geocoder.geocode({'placeId': placeId}, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          map.setZoom(15);
          map.setCenter(results[0].geometry.location);
          const position = results[0].geometry.location;
          new google.maps.Marker({map, position});

          return resolve({
            latitude: position.lat(),
            longitude: position.lng()
          });
        } else {
          window.alert('No results found');
          return reject();
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
        return reject();
      }
    });



  });
}