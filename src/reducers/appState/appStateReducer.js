import {combineReducers} from 'redux';
import error from './errorReducer';
import createEventForm from '../../create/createEventFormReducer';
import {types as googleMapsActionTypes} from '../../actions/googleMapsActions';
import {types as eventUserActionTypes} from '../../event/eventUserActions';

function isGoogleAPILoaded(state = false, {type}) {
  switch (type) {
    case googleMapsActionTypes.initGoogleMapsAPISuccess: {
      return true;
    }
    default:
      return state;
  }
}

function userCoordinates(state = {latitude: null, longitude: null, lastUpdated: null}, {type, payload}) {
  switch (type) {
    case eventUserActionTypes.fetchLocationSuccess: {
      const {latitude, longitude, lastUpdated} = payload;
      return {latitude, longitude, lastUpdated};
    }
    default:
      return state;
  }
}

export default combineReducers({
  isGoogleAPILoaded,
  error,
  createEventForm,
  userCoordinates
});