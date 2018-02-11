import {types} from '../../event/eventActions';
import {AttendeeDefaultProps} from '../../event/AttendeesList/AttendeesListItem/AttendeesListItem';

export const moduleName = 'events';

const initialState = {};

export const eventInitialState = {
  eventId: null,
  placeId: null,
  location: '',
  eventTime: null,
  attendees: [],
  me: AttendeeDefaultProps
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
    case types.refreshEventRequest: {
      const {eventId, duration, lastUpdated} = payload;
      return {
        ...state,
        [eventId]: {
          ...state[eventId],
          me: {
            ...state[eventId].me,
            duration,
            lastUpdated
          }
        }
      };
    }
    case types.refreshEventSuccess: {
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
    case types.leaveForEventRequest: {
      const {eventId} = payload;
      return {
        ...state,
        [eventId]: {
          ...state[eventId],
          me: {
            ...state[eventId].me,
            hasLeft: true
          }
        }
      };
    }
    case types.leaveForEventFailure: {
      const {eventId} = payload;
      return {
        ...state,
        [eventId]: {
          ...state[eventId],
          me: {
            ...state[eventId].me,
            hasLeft: false
          }
        }
      };
    }
    case types.changeTravelModeRequest:
    case types.changeTravelModeFailure: {
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
    default:
      return state;
  }
}