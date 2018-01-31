import {types} from '../../event/eventActions';
import {DEFAULT_TRAVEL_MODE} from '../../helpers/globalConstants';

export const moduleName = 'events';

const initialState = {};

export const eventInitialState = {
  eventId: null,
  placeId: null,
  placeName: '',
  eventTime: null,
  isLoggedIn: false,
  attendees: [],
  userName: null,
  myETA: null,
  myLUT: null,
  travelMode: DEFAULT_TRAVEL_MODE
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
          eventId
        }
      };
    }
    case types.fetchEventSuccess: {
      const {eventId, placeName, placeId, eventTime} = payload;
      return {
        ...state,
        [eventId]: {
          ...state[eventId],
          placeName,
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
          travelMode
        }
      };
    }
    case types.loginEvent: {
      const {eventId, userName} = payload;
      return {
        ...state,
        [eventId]: {
          ...state[eventId],
          userName,
          isLoggedIn: true
        }
      };
    }
    case types.fetchMyETASuccess: {
      const {eventId, myETA, myLUT} = payload;
      return {
        ...state,
        [eventId]: {
          ...state[eventId],
          myETA,
          myLUT
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
    default:
      return state;
  }
}