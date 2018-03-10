import {types as eventActionTypes} from '../event/eventActions';
import {types} from './errorActions';

export const moduleName = 'error';

export default function(state = null, {type, payload}) {
  switch(type) {
    case eventActionTypes.refreshEventFailure: {
      const {eventId, duration, lastUpdated, hasLeft} = payload;
      return `${eventId} ${duration} ${lastUpdated} ${hasLeft}`;
    }
    case eventActionTypes.getAttendeesFailure: {
      const {eventId} = payload;
      return `Get attendees failed ${eventId}`;
    }
    case eventActionTypes.leaveForEventFailure: {
      const {eventId, hasLeft} = payload;
      return `Left for event failed for event: ${eventId} and ${hasLeft}`;
    }
    case types.clearError: {
      return null;
    }
    default:
      return state;
  }
}