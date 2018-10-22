import { moduleName as activeEventModuleName } from "./activeEventReducer";
import {
  makeSelectEvent,
  makeSelectEventName,
  makeSelectEventScheduledTime,
  makeSelectEventNumAttendees,
  makeSelectEventMe,
  makeSelectEventMyTravelMode
} from "./eventSelectors";

function selectActiveEvent(state) {
  return makeSelectEvent(state)(state[activeEventModuleName].code) || null;
}

export function selectActiveEventHasLoaded(state) {
  return !!selectActiveEvent(state);
}

export function selectActiveEventCode(state) {
  if (!selectActiveEventHasLoaded(state)) {
    return null;
  }
  return selectActiveEvent(state).code;
}

export function selectActiveEventName(state) {
  return makeSelectEventName(state)(selectActiveEventCode(state));
}

export function selectActiveEventScheduledTime(state) {
  return makeSelectEventScheduledTime(state)(selectActiveEventCode(state));
}

export function selectActiveEventNumAttendees(state) {
  return makeSelectEventNumAttendees(state)(selectActiveEventCode(state));
}

function selectActiveEventMe(state) {
  return makeSelectEventMe(state)(selectActiveEventCode(state));
}

export function selectActiveEventHasJoined(state) {
  return !!selectActiveEventMe(state);
}

export function selectActiveEventMyTravelMode(state) {
  return makeSelectEventMyTravelMode(state)(selectActiveEventCode(state));
}
