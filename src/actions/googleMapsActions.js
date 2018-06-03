import {init} from '../helpers/googlemaps';
import logger from '../helpers/logger';
import {selectIsGoogleAPILoaded} from "../reducers/appState/appStateSelectors";

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
  return (dispatch, getState) => new Promise(async (resolve, reject) => {
    const state = getState();
    if (selectIsGoogleAPILoaded(state)) {
      return resolve();
    }
    try {
      await init();
      dispatch(initGoogleMapsAPISuccess());
      return resolve();
    } catch (error) {
      alert(`Failed to load Google Maps API: ${error}`);
      dispatch(initGoogleMapsAPIFailure());
      return reject();
    }
  });
}