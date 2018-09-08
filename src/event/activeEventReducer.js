import { types } from './eventActions';

export const moduleName = 'activeEvent';

export default function activeEvent(state = null, { type, payload }) {
  switch (type) {
    case types.fetchEventRequest: {
      const { eventId } = payload;
      return parseInt(eventId, 10);
    }
    default:
      return state;
  }
}
