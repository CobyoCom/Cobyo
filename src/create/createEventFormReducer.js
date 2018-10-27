import { combineReducers } from "redux";
import { types } from "./createEventActions";

export const moduleName = "createEventForm";

function placeId(state = null, { type, payload }) {
  switch (type) {
    case types.selectPlace: {
      return payload.placeId;
    }
    case types.createEventSuccess:
    case types.createEventFailure:
    case types.editEventSuccess:
    case types.editEventFailure: {
      return null;
    }
    default:
      return state;
  }
}

function name(state = "", { type, payload }) {
  switch (type) {
    case types.selectPlace: {
      return payload.name;
    }
    case types.createEventSuccess:
    case types.createEventFailure:
    case types.editEventSuccess:
    case types.editEventFailure: {
      return "";
    }
    default:
      return state;
  }
}

function scheduledTime(state = null, { type }) {
  switch (type) {
    default:
      return state;
  }
}

export default combineReducers({
  placeId,
  name,
  scheduledTime
});
