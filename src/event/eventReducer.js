import {types} from './eventActions';

export const moduleName = 'event';

const initialState = {
  eventId: null,
  placeId: null,
  eventTime: null,
  isLoggedIn: false,
  attendees: [],
  userName: null,
  myETA: null,
  myLUT: null
};

export default function(state = initialState, {type, payload}) {
  switch(type) {
    case types.fetchEventRequest: {
      const {eventId} = payload;
      return {...state, eventId}
    }
    case types.fetchEventSuccess: {
      const {placeId, eventTime} = payload;
      return {...state, placeId, eventTime};
    }
    case types.loginEvent: {
      const {userName} = payload;
      return {...state, userName, isLoggedIn: true};
    }
    case types.fetchETASuccess: {
      const {myETA, myLUT} = payload;
      return {...state, myETA, myLUT};
    }
    case types.getAttendeesSuccess: {
      const {attendees} = payload;
      return {...state, attendees}
    }
    default:
      return state;
  }
}