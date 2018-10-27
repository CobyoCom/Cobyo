import { types as eventUserActionTypes } from "../../event/eventUserActions";
import { types as visulizationTypes } from "../../event/EventVisualization/visualizationActions";
import { combineReducers } from "redux";

export const moduleName = "event";

function isCalculatingDuration(state = false, { type }) {
  switch (type) {
    case eventUserActionTypes.refreshMeRequest:
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

export default combineReducers({
  isCalculatingDuration,
  shouldShowTravelModeSelect
});
