import {types as eventActionTypes} from '../event/eventActions';
import {types} from './errorActions';

export const moduleName = 'error';

export default function(state = null, {type}) {
  switch (type) {
    case eventActionTypes.refreshEventFailure: {
      return 'Unable to load event. Please try again.';
    }
    case eventActionTypes.getAttendeesFailure: {
      return 'Unable to load attendees. Please try again.';
    }
    case eventActionTypes.leaveForEventFailure: {
      return 'Unable to register action. Please try again.';
    }
    case types.clearError: {
      return null;
    }
    default:
      return state;
  }
}