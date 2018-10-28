import { createSelector } from "reselect";
import { moduleName as activeEventModuleName } from "./activeEventReducer";
import {
  makeSelectEvent,
  makeSelectEventName,
  makeSelectEventEndedTime,
  makeSelectEventScheduledTime,
  makeSelectEventNumAttendees,
  makeSelectEventGooglePlaceId,
  makeSelectEventMe,
  makeSelectEventMyTravelMode,
  makeSelectEventMyUpdatedTime,
  makeSelectEventUsers
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

export function selectActiveEventEndedTime(state) {
  return makeSelectEventEndedTime(state)(selectActiveEventCode(state));
}

export function selectActiveEventScheduledTime(state) {
  return makeSelectEventScheduledTime(state)(selectActiveEventCode(state));
}

export function selectActiveEventNumAttendees(state) {
  return makeSelectEventNumAttendees(state)(selectActiveEventCode(state));
}

export function selectActiveEventUsers(state) {
  return makeSelectEventUsers(state)(selectActiveEventCode(state));
}

export function selectActiveEventOtherAttendeesList(state) {
  return createSelector(
    selectActiveEventUsers,
    selectActiveEventMe,
    (eventUsers, me) =>
      eventUsers.filter(eventUser => eventUser.user.name !== me.user.name)
  )(state);
}

export function selectActiveEventAttendeesList(state) {
  return createSelector(
    selectActiveEventOtherAttendeesList,
    selectActiveEventMe,
    (attendeesList, me) => [me, ...attendeesList]
  )(state);
}

export function selectActiveEventGooglePlaceId(state) {
  return makeSelectEventGooglePlaceId(state)(selectActiveEventCode(state));
}

export function selectActiveEventMe(state) {
  return makeSelectEventMe(state)(selectActiveEventCode(state));
}

export function selectActiveEventHasJoined(state) {
  return !!selectActiveEventMe(state);
}

export function selectActiveEventMyTravelMode(state) {
  return makeSelectEventMyTravelMode(state)(selectActiveEventCode(state));
}

export function selectActiveEventMyUpdatedTime(state) {
  return makeSelectEventMyUpdatedTime(state)(selectActiveEventCode(state));
}
