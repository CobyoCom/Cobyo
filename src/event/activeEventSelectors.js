import {createSelector} from 'reselect';
import {moduleName as eventsModuleName, eventInitialState} from '../reducers/entities/eventsReducer';
import {moduleName as attendeesModuleName} from './Attendees/attendeesReducer';
import {moduleName as uiEventModuleName} from '../reducers/ui/uiEventReducer';
import {moduleName as activeEventModuleName} from './activeEventReducer';
import {selectEventNotificationsById} from "./EventNotifications/eventNotificationsSelectors";

/****** EVENT ENTITIES ******/

const selectActiveEventId = state => state[activeEventModuleName];
const selectEventsById = state => state.entities[eventsModuleName];
const selectEventAttendeesById = state => state.entities[attendeesModuleName];

const selectActiveEvent = createSelector(
  selectActiveEventId,
  selectEventsById,
  (eventId, eventsById) => eventsById[eventId] || eventInitialState
);

export const selectEventId = state => selectActiveEvent(state).eventId;
export const selectPlaceId = state => selectActiveEvent(state).placeId;
export const selectEventLocation = state => selectActiveEvent(state).location;
export const selectEventTime = state => selectActiveEvent(state).eventTime;
export const selectMe = state => selectActiveEvent(state).me;
const selectEventNotificationIds = state => selectActiveEvent(state).eventNotificationIds;
const selectEventAttendeeIds = state => selectActiveEvent(state).attendeeIds;

export const selectIsLoggedIn = state => !!selectMe(state).userName;
export const selectUserName = state => selectMe(state).userName;
export const selectDuration = state => selectMe(state).duration;
export const selectLastUpdated = state => selectMe(state).lastUpdated;
export const selectTravelMode = state => selectMe(state).travelMode;
export const selectHasLeft = state => selectMe(state).hasLeft;

/****** EVENT UI ******/

const selectEventUI = state => state.ui[uiEventModuleName];

export const selectIsRefreshing = state => selectEventUI(state).isRefreshing;


/****** EVENT NOTIFICATIONS ENTITIES ******/

export const selectEventNotifications = createSelector(
  selectEventNotificationIds,
  selectEventNotificationsById,
  (ids, byId) => ids.map(id => byId[id])
);


/****** EVENT ATTENDEES ENTITIES ******/

export const selectEventAttendees = createSelector(
  selectEventAttendeeIds,
  selectEventAttendeesById,
  (ids, byId) => ids.map(id => byId[id])
);