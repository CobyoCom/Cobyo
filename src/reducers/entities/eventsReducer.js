import {types as eventTypes} from '../../event/eventActions';
import {types as eventUserTypes} from '../../event/eventUserActions';
import {types as eventNotificationTypes} from '../../event/notifications/eventNotificationsActions';
import {AttendeeDefaultProps} from '../../event/attendees/AttendeesListItem/AttendeesListItem';

export const moduleName = 'events';

const initialState = {};

export const eventInitialState = {
  eventId: null,
  placeId: null,
  location: '',
  eventTime: null,
  attendeeIds: [],
  eventNotificationIds: [],
  me: AttendeeDefaultProps,
  isRefreshing: false
};

export default function events(state = initialState, {type, payload}) {
  switch (type) {
    case eventTypes.fetchEventRequest: {
      const {eventId} = payload;
      return {
        ...state,
        [eventId]: {
          ...eventInitialState,
          ...state[eventId]
        }
      };
    }
    case eventTypes.fetchEventSuccess: {
      const {eventId, location, placeId, eventTime} = payload;
      return {
        ...state,
        [eventId]: {
          ...state[eventId],
          eventId: parseInt(eventId, 10),
          location,
          placeId,
          eventTime
        }
      };
    }
    case eventUserTypes.loginEventSuccess: {
      const {eventId, userName, travelMode} = payload;
      return {
        ...state,
        [eventId]: {
          ...state[eventId],
          me: {
            ...state[eventId].me,
            userName,
            travelMode
          }
        }
      };
    }
    case eventUserTypes.refreshEventSuccess:
    case eventUserTypes.refreshEventFailure: {
      const {eventId, duration, lastUpdated, hasLeft} = payload;
      return {
        ...state,
        [eventId]: {
          ...state[eventId],
          me: {
            ...state[eventId].me,
            duration,
            lastUpdated,
            hasLeft
          }
        }
      };
    }
    case eventUserTypes.getAttendeesSuccess: {
      const {eventId, attendees} = payload;
      return {
        ...state,
        [eventId]: {
          ...state[eventId],
          attendeeIds: attendees.map(attendee => attendee.id)
        }
      };
    }
    case eventUserTypes.leaveForEventRequest:
    case eventUserTypes.leaveForEventFailure: {
      const {eventId, hasLeft} = payload;
      return {
        ...state,
        [eventId]: {
          ...state[eventId],
          me: {
            ...state[eventId].me,
            hasLeft
          }
        }
      };
    }
    case eventUserTypes.changeTravelModeSuccess: {
      const {eventId, travelMode} = payload;
      return {
        ...state,
        [eventId]: {
          ...state[eventId],
          me: {
            ...state[eventId].me,
            travelMode
          }
        }
      };
    }
    case eventNotificationTypes.fetchEventNotificationsSuccess: {
      const {eventId, notifications} = payload;
      return {
        ...state,
        [eventId]: {
          ...state[eventId],
          eventNotificationIds: notifications.map(({id}) => id)
        }
      };
    }
    default:
      return state;
  }
}