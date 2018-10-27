import { combineReducers } from "redux";
import { types } from "./eventActions_old";
import { types as createActionTypes } from "../create/createActions_old";
import { types as visualizationActionTypes } from "./EventVisualization/visualizationActions";

export const moduleName = "activeEvent";

function eventId(state = null, { type, payload }) {
  switch (type) {
    case types.fetchEventRequest: {
      const { eventId } = payload;
      return parseInt(eventId, 10);
    }
    case createActionTypes.createEventRequest: {
      return null;
    }
    case createActionTypes.createEventFailure: {
      const { prevActiveEventId } = payload;
      return prevActiveEventId;
    }
    default:
      return state;
  }
}

function selectedAttendee(state = null, { type, payload }) {
  switch (type) {
    case visualizationActionTypes.selectAttendee:
      return payload;
    case visualizationActionTypes.deselectAttendee:
      return null;
    default:
      return state;
  }
}

export default combineReducers({
  eventId,
  selectedAttendee
});
