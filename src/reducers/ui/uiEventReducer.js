import { types as eventUserActionTypes } from "../../event/eventUserActions";
import { types as visulizationTypes } from "../../event/EventVisualization/visualizationActions";
import { combineReducers } from "redux";

export const moduleName = "event";

function isCalculatingDuration(state = false, { type }) {
  switch (type) {
    case eventUserActionTypes.changeTravelModeRequest:
      return true;
    case eventUserActionTypes.updateEventUserSuccess:
      return false;
    default:
      return state;
  }
}

function shouldShowTravelModeSelect(state = false, { type, payload }) {
  switch (type) {
    case eventUserActionTypes.toggleShowTravelModeSelect:
      return payload;
    case eventUserActionTypes.updateEventUserSuccess:
      return false;
    default:
      return state;
  }
}

function zoomLevel(state = 3, { type, payload }) {
  switch (type) {
    // case types.getAttendeesSuccess: {
    //   const {attendees} = payload;
    //   if (!attendees.length) {
    //     return state;
    //   }
    //
    //   const max = attendees.reduce((acc, {duration}) => {
    //     return Math.max(acc, duration);
    //   }, 0);
    // }
    case visulizationTypes.incrementZoomLevel:
      return state + 1;
    case visulizationTypes.decrementZoomLevel:
      return Math.max(1, state - 1);
    default:
      return state;
  }
}

export default combineReducers({
  isCalculatingDuration,
  shouldShowTravelModeSelect,
  zoomLevel
});
