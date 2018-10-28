import { moduleName as eventsModuleName } from "../reducers/entities/eventsReducer";

export function selectEventsById(state) {
  return state.entities[eventsModuleName];
}

export function makeSelectEvent(state) {
  return code => {
    return selectEventsById(state)[code];
  };
}

export function makeSelectEventName(state) {
  return code => {
    const event = makeSelectEvent(state)(code);
    return event ? event.name : null;
  };
}

export function makeSelectEventEndedTime(state) {
  return code => {
    const event = makeSelectEvent(state)(code);
    return event ? event.endedTime : null;
  }
}

export function makeSelectEventScheduledTime(state) {
  return code => {
    const event = makeSelectEvent(state)(code);
    return event ? event.scheduledTime : null;
  };
}

export function makeSelectEventNumAttendees(state) {
  return code => {
    const event = makeSelectEvent(state)(code);
    return event ? event.numAttendees : null;
  };
}

export function makeSelectEventUsers(state) {
  return code => {
    const event = makeSelectEvent(state)(code);
    return event ? event.eventUsers : null;
  };
}

export function makeSelectEventPlace(state) {
  return code => {
    const event = makeSelectEvent(state)(code);
    return event ? event.place : null;
  };
}

export function makeSelectEventGooglePlaceId(state) {
  return code => {
    const place = makeSelectEventPlace(state)(code);
    return place ? place.googlePlaceId : null;
  };
}

export function makeSelectEventMe(state) {
  return code => {
    const event = makeSelectEvent(state)(code);
    return event ? event.me : null;
  };
}

export function makeSelectEventMyTravelMode(state) {
  return code => {
    const me = makeSelectEventMe(state)(code);
    return me ? me.travelMode : null;
  };
}
