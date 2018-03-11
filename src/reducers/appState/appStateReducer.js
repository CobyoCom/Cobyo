import {combineReducers} from 'redux';
import {types as googleMapsActionTypes} from '../../actions/googleMapsActions';
import {types as eventActionTypes} from '../../event/eventActions';
import {types as errorBannerActionTypes} from '../../error/errorBannerActions';

function error(state = null, {type}) {
  switch (type) {
    case errorBannerActionTypes.clearError: {
      return null;
    }
    case eventActionTypes.refreshEventFailure: {
      return 'Something went wrong. Please try again.';
    }
    case eventActionTypes.getAttendeesFailure: {
      return 'Unable to load attendees. Please try again.';
    }
    case eventActionTypes.leaveForEventFailure: {
      return 'Unable to register action. Please try again.';
    }
    case eventActionTypes.fetchTravelDurationFailure: {
      return 'Unable to calculate travel duration. Please try again.';
    }
    case googleMapsActionTypes.initGoogleMapsAPIFailure: {
      return 'Unable to load Google Maps API. Please try again.';
    }
    default:
      return state;
  }
}

function isGoogleAPILoaded(state = false, {type}) {
  switch (type) {
    case googleMapsActionTypes.initGoogleMapsAPISuccess: {
      return true;
    }
    default:
      return state;
  }
}

export default combineReducers({
  isGoogleAPILoaded,
  error
});