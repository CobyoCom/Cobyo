import { types as eventTypes } from "../../event/eventActions";
import { types as eventUserTypes } from "../../event/eventUserActions";

export const moduleName = "events";
export const eventInitialState = {
  code: null,
  name: null,
  endedTime: null,
  scheduledTime: null,
  me: null,
  place: null,
  numAttendees: null,
  eventUsers: [],
  notifications: []
};

export default function events(state = {}, { type, payload }) {
  switch (type) {
    case eventTypes.fetchEventRequest:
    case eventTypes.fetchEventSuccess: {
      const { code } = payload;
      return {
        ...state,
        [code]: {
          ...eventInitialState,
          ...state[code],
          ...payload
        }
      };
    }
    case eventTypes.joinEventSuccess: {
      const { eventUser, code } = payload;
      return {
        ...state,
        [code]: {
          ...eventInitialState,
          ...state[code],
          me: eventUser
        }
      };
    }
    case eventUserTypes.fetchDurationSuccess: {
      const {code, eventUser} = payload;
      return {
        ...state,
        [code]: {
          ...eventInitialState,
          ...state[code],
          me: {
            ...state[code].me,
            ...eventUser
          }
        }
      }
    }
    default:
      return state;
  }
}
