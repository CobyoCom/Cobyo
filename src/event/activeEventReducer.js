import { types } from './eventActions';
import { types as createActionTypes } from '../create/createActions';

export const moduleName = 'activeEvent';

export default function activeEvent(state = null, { type, payload }) {
  switch (type) {
    case types.fetchEventRequest: {
      const { eventId } = payload;
      return parseInt(eventId, 10);
    }
    case createActionTypes.createEventRequest: {
      return null;
    }
    case createActionTypes.createEventFailure: {
      const { prevActiveEventId } = payload;
      return prevActiveEventId;
    }
    default:
      return state;
  }
}
