import { combineReducers } from "redux";
import { types as eventActionsTypes } from "./eventActions";
import { types as createEventActionTypes } from "../create/createEventActions";

export const moduleName = "activeEvent";

function code(state = null, { type, payload }) {
  switch (type) {
    case createEventActionTypes.createEventSuccess:
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
