import { fetchEventApi, fetchEventUsersApi, joinEventApi } from "./eventApi";
import {selectActiveEventCode} from "./activeEventSelectors";

export const types = {
  fetchEventRequest: "FETCH_EVENT_REQUEST",
  fetchEventSuccess: "FETCH_EVENT_SUCCESS",
  fetchEventFailure: "FETCH_EVENT_FAILURE",
  joinEventSuccess: "JOIN_EVENT_SUCCESS",
  fetchEventUsersSuccess: "FETCH_EVENT_USERS_SUCCESS"
};

const fetchEventRequest = code => ({
  type: types.fetchEventRequest,
  payload: { code }
});

const fetchEventSuccess = event => ({
  type: types.fetchEventSuccess,
  payload: event
});

const fetchEventFailure = () => ({
  type: types.fetchEventFailure
});

export function fetchEvent(code) {
  return async dispatch => {
    dispatch(fetchEventRequest(code));
    const response = await fetchEventApi(code);
    const event = response.data.event;

    if (event) {
      dispatch(fetchEventSuccess(event));
    } else {
      dispatch(fetchEventFailure());
    }

    return Promise.resolve(event);
  };
}

const joinEventSuccess = ({ eventUser, code }) => ({
  type: types.joinEventSuccess,
  payload: {
    eventUser,
    code
  }
});

export function joinEvent(code) {
  return async dispatch => {
    const response = await joinEventApi(code);
    const eventUser = response.data.joinEvent;

    if (eventUser) {
      dispatch(
        joinEventSuccess({
          eventUser,
          code
        })
      );
    }
  };
}

const fetchEventUsersSuccess = event => ({
  type: types.fetchEventUsersSuccess,
  payload: event
});

export function fetchEventUsers(initialCode = null) {
  return async (dispatch, getState) => {
    const code = initialCode || selectActiveEventCode(getState());
    const response = await fetchEventUsersApi(code);
    const event = response.data.event;

    if (event) {
      dispatch(fetchEventUsersSuccess(event));
    }
  };
}
