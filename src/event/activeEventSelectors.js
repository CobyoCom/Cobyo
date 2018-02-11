import {createSelector} from 'reselect';
import {moduleName as eventsModuleName, eventInitialState} from '../reducers/entities/eventsReducer';
import {moduleName as uiEventModuleName} from '../reducers/ui/uiEventReducer';
import {moduleName as activeEventModuleName} from './activeEventReducer';

/****** EVENT ENTITIES ******/

const selectActiveEventId = state => state[activeEventModuleName];
const selectEvents = state => state.entities[eventsModuleName];

const selectActiveEvent = createSelector(
  selectActiveEventId,
  selectEvents,
  (activeEventId, events) => events[activeEventId] || eventInitialState
);

export const selectEventId = state => selectActiveEvent(state).eventId;
export const selectPlaceId = state => selectActiveEvent(state).placeId;
export const selectEventLocation = state => selectActiveEvent(state).location;
export const selectEventTime = state => selectActiveEvent(state).eventTime;
export const selectEventAttendees = state => selectActiveEvent(state).attendees;
export const selectMe = state => selectActiveEvent(state).me;

export const selectIsLoggedIn = state => !!selectMe(state).userName;
export const selectUserName = state => selectMe(state).userName;
export const selectDuration = state => selectMe(state).duration;
export const selectLastUpdated = state => selectMe(state).lastUpdated;
export const selectTravelMode = state => selectMe(state).travelMode;
export const selectHasLeft = state => selectMe(state).hasLeft;


/****** EVENT UI ******/

const selectEventUI = state => state.ui[uiEventModuleName];

export const selectIsRefreshing = state => selectEventUI(state).isRefreshing;