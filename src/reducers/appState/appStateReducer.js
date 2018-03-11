import {combineReducers} from 'redux';
import error from './errorReducer';
import {types as googleMapsActionTypes} from '../../actions/googleMapsActions';

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