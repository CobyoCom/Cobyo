import {types} from './eventActions';

export const moduleName = 'event';

const initialState = {
  eventId: null,
  placeId: null,
  eventTime: null,
  isLoggedIn: false,
  attendees: [
    {
      userName: "Alex",
      estimatedArrivalTime: "2018-01-20 17:26",
      lastUpdatedTime: "2018-01-20 17:17"
    },
    {
      userName: "Josh",
      estimatedArrivalTime: "2018-01-13 18:25",
      lastUpdatedTime: "2018-01-13 17:30"
    }
  ]
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
    case types.loginEventSuccess: {
      const {placeId, eventTime, attendees} = payload;
      return {...state, placeId, eventTime, attendees, isLoggedIn: true};
    }
    default:
      return state;
  }
}