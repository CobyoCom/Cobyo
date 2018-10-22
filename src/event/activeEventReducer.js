import { combineReducers } from "redux";
import { types as eventActionsTypes } from "./eventActions";

export const moduleName = "activeEvent";

function code(state = null, { type, payload }) {
  switch (type) {
    case eventActionsTypes.fetchEventRequest: {
      return payload.code;
    }
    default:
      return state;
  }
}

function selectedAttendee(state = null, { type }) {
  switch (type) {
    default:
      return state;
  }
}

export default combineReducers({
  code,
  selectedAttendee
});
