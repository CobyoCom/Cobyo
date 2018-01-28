import {createSelector} from 'reselect';
import {moduleName as eventsModuleName} from '../reducers/entities/eventsReducer';
import {moduleName as activeEventModuleName} from './activeEventReducer';
import {eventInitialState} from '../reducers/entities/eventsReducer';

const selectActiveEventId = state => state[activeEventModuleName];
const selectEvents = state => state.entities[eventsModuleName];

const selectActiveEvent = createSelector(
  selectActiveEventId,
  selectEvents,
  (activeEventId, events) => events[activeEventId] || eventInitialState
);

export const selectEventId = state => selectActiveEvent(state).eventId;
export const selectPlaceId = state => selectActiveEvent(state).placeId;
export const selectEventTime = state => selectActiveEvent(state).eventTime;
export const selectIsLoggedIn = state => selectActiveEvent(state).isLoggedIn;
export const selectEventAttendees = state => selectActiveEvent(state).attendees;
export const selectUserName = state => selectActiveEvent(state).userName;
export const selectTravelMode = state => selectActiveEvent(state).travelMode;
export const selectMyETA = state => selectActiveEvent(state).myETA;
export const selectMyLUT = state => selectActiveEvent(state).myLUT;