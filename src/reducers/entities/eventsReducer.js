import { types as eventTypes } from "../../event/eventActions";
import { types as eventUserTypes } from "../../event/eventUserActions";
import { types as createEventTypes} from "../../create/createEventActions";
import { concatUnique } from "../helpers";

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
    case eventTypes.fetchEventSuccess:
    case eventTypes.fetchEventUsersSuccess:
    case createEventTypes.editEventSuccess: {
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
    case eventTypes.joinEventSuccess:
    case eventUserTypes.fetchDurationSuccess: {
      const { eventUser, code } = payload;
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
      };
    }
    case eventUserTypes.updateEventUserSuccess: {
      const { eventUser, code } = payload;
      return {
        ...state,
        [code]: {
          ...eventInitialState,
          ...state[code],
          eventUsers: concatUnique(
            [eventUser],
            state[code].eventUsers,
            "user.name"
          )
        }
      };
    }
    default:
      return state;
  }
}
