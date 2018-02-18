import {types} from '../../event/eventActions';
import {types as notificationTypes} from '../../event/EventNotifications/eventNotificationsActions';
import {AttendeeDefaultProps} from '../../event/AttendeesList/AttendeesListItem/AttendeesListItem';

export const moduleName = 'events';

const initialState = {};

export const eventInitialState = {
  eventId: null,
  placeId: null,
  location: '',
  eventTime: null,
  attendees: [],
  eventNotificationIds: [],
  me: AttendeeDefaultProps,
  isRefreshing: false
};

export default function events(state = initialState, {type, payload}) {
  switch(type) {
    case types.fetchEventRequest: {
      const {eventId} = payload;
      return {
        ...state,
        [eventId]: {
          ...eventInitialState,
          ...state[eventId],
          eventId: parseInt(eventId, 10)
        }
      };
    }
    case types.fetchEventSuccess: {
      const {eventId, location, placeId, eventTime} = payload;
      return {
        ...state,
        [eventId]: {
          ...state[eventId],
          location,
          placeId,
          eventTime
        }
      };
    }
    case types.setTravelMode: {
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
    case types.loginEvent: {
      const {eventId, userName} = payload;
      return {
        ...state,
        [eventId]: {
          ...state[eventId],
          me: {
            ...state[eventId].me,
            userName
          }
        }
      };
    }
    case types.refreshEventSuccess:
    case types.refreshEventFailure: {
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
    case types.getAttendeesSuccess: {
      const {eventId, attendees} = payload;
      return {
        ...state,
        [eventId]: {
          ...state[eventId],
          attendees
        }
      };
    }
    case types.leaveForEventRequest:
    case types.leaveForEventFailure: {
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
    case types.changeTravelMode: {
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
    case notificationTypes.fetchEventNotificationsSuccess: {
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