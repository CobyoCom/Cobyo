import { combineReducers } from "redux";
import error from "./errorReducer";
import createEventForm from "../../create/createEventFormReducer";
import { types as googleMapsActionTypes } from "../../actions/googleMapsActions";
import { types as eventUserActionTypes } from "../../event/eventUserActions";

function isGoogleAPILoaded(state = false, { type }) {
  switch (type) {
    case googleMapsActionTypes.initGoogleMapsAPISuccess: {
      return true;
    }
    default:
      return state;
  }
}

function position(state = null, { type, payload }) {
  switch (type) {
    case eventUserActionTypes.fetchCoordinatesSuccess:
      return payload;
    default:
      return state;
  }
}

export default combineReducers({
  isGoogleAPILoaded,
  error,
  createEventForm,
  position
});
