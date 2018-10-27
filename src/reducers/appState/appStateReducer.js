import { combineReducers } from "redux";
import error from "./errorReducer";
import createEventForm from "../../create/createEventFormReducer";
import { types as googleMapsActionTypes } from "../../actions/googleMapsActions";
import { types as eventUserActionTypes } from "../../event/eventUserActions";
import {types as visulizationTypes} from "../../event/EventVisualization/visualizationActions";

function isGoogleAPILoaded(state = false, { type }) {
  switch (type) {
    case googleMapsActionTypes.initGoogleMapsAPISuccess: {
      return true;
    }
    default:
      return state;
  }
}

function position(
  state = {
    latitude: null,
    longitude: null,
    timestamp: null
  },
  { type, payload }
) {
  switch (type) {
    case eventUserActionTypes.fetchCoordinatesSuccess:
      return payload;
    default:
      return state;
  }
}

function zoomLevel(state = 3, { type }) {
  switch (type) {
    case visulizationTypes.incrementZoomLevel:
      return state + 1;
    case visulizationTypes.decrementZoomLevel:
      return Math.max(1, state - 1);
    default:
      return state;
  }
}

export default combineReducers({
  isGoogleAPILoaded,
  error,
  createEventForm,
  position,
  zoomLevel
});
