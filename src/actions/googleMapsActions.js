import {init} from '../helpers/googlemaps';

export const types = {
  initGoogleMapsAPISuccess: 'INIT_GOOGLE_MAPS_API_SUCCESS'
};

function initGoogleMapsAPISuccess() {
  return {type: types.initGoogleMapsAPISuccess};
}

export function initGoogleMapsAPI() {
  return async dispatch => {
    await init();
    dispatch(initGoogleMapsAPISuccess());
  };
}