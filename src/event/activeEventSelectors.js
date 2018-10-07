import { createSelector } from 'reselect';
import {
  moduleName as eventsModuleName,
  eventInitialState
} from '../reducers/entities/eventsReducer';
import { moduleName as attendeesModuleName } from './attendees/attendeesReducer';
import { moduleName as uiEventModuleName } from '../reducers/ui/uiEventReducer';
import { moduleName as activeEventModuleName } from './activeEventReducer';
import { selectNotificationsById } from './notifications/notificationsSelectors';

/****** EVENT ENTITIES ******/

export const selectActiveEventId = state => state[activeEventModuleName];
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
export const selectEventScheduledTime = state => !isNaN(selectActiveEvent(state).scheduledTime) ? parseInt(selectActiveEvent(state).scheduledTime, 10) : null;
export const selectEventPhotoReference = state => selectActiveEvent(state).photoReference;
export const selectDateEnded = state => selectActiveEvent(state).dateEnded;
export const selectHasEventEnded = state => !!selectDateEnded(state);
export const selectMe = state => selectActiveEvent(state).me;
export const selectNotificationIds = state => selectActiveEvent(state).notificationIds;
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
export const selectZoomLevel = state => selectEventUI(state).zoomLevel;

/****** EVENT NOTIFICATIONS ENTITIES ******/

export const selectNotifications = createSelector(
  selectNotificationIds,
  selectNotificationsById,
  (ids, byId) => ids.map(id => byId[id])
);

/****** EVENT ATTENDEES ENTITIES ******/

export const selectEventAttendees = createSelector(
  selectEventAttendeeIds,
  selectEventAttendeesById,
  selectUserName,
  (ids, byId, userName) => ids.filter(id => id !== userName).map(id => byId[id])
);
export const selectNumEventAttendees = createSelector(
  selectEventAttendees,
  eventAttendees => (eventAttendees.length || 0) + 1
);
