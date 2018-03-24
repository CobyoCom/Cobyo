import {combineReducers} from 'redux';
import {types} from './createActions';

const placeId = (state = null, {type, payload}) => {
  switch (type) {
    case types.selectPlace: {
      return payload.placeId;
    }
    default:
      return state;
  }
};

const placeName = (state = '', {type, payload}) => {
  switch(type) {
    case types.selectPlace: {
      return payload.placeName;
    }
    default:
      return state;
  }
};

export default combineReducers({
  placeId,
  placeName
});