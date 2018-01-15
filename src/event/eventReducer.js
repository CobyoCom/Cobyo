import {types} from './eventActions';

export const moduleName = 'event';

const initialState = {
  eventId: null,
  placeId: null,
  eventTime: null
};

export default function(state = initialState, {type, payload}) {
  switch(type) {
    case types.fetchEventRequest: {
      const {eventId} = payload;
      return {...state, eventId}
    }
    case types.fetchEventSuccess: {
      return {...state, ...payload};
    }
    default:
      return state;
  }
}