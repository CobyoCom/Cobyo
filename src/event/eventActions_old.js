import { fetchEventApi, editEventScheduledTimeApi } from "./eventApi_old";
import { getItem } from "../helpers/localStorage";
import { selectEventId } from "./activeEventSelectors_old";

export const types = {
  fetchEventRequest: "FETCH_EVENT_REQUEST",
  fetchEventSuccess: "FETCH_EVENT_SUCCESS",
  editEventScheduledTimeSuccess: "EDIT_EVENT_SCHEDULED_TIME_SUCCESS"
};

/************ FETCH EVENT ************/

const fetchEventRequest = eventId => ({
  type: types.fetchEventRequest,
  payload: { eventId }
});

const fetchEventSuccess = payload => ({
  type: types.fetchEventSuccess,
  payload: payload
});

export function fetchEvent(eventId) {
  return async dispatch => {
    dispatch(fetchEventRequest(eventId));

    try {
      const response = await fetchEventApi(eventId.toString());
      if (
        response &&
        !response.errors &&
        response.data &&
        response.data.event
      ) {
        const {
          code,
          name,
          scheduledTime,
          dateEnded,
          place: { googlePlaceId, photoUrl }
        } = response.data.event;
        dispatch(
          fetchEventSuccess({
            eventId: code,
            location: name,
            placeId: googlePlaceId,
            scheduledTime,
            dateEnded,
            photoReference: photoUrl
          })
        );

        const localStorageData = {};
        const localStorageEvents = getItem("events", true);
        const localStorageUserName = getItem("userName");

        const localStorageEvent =
          !!localStorageEvents && localStorageEvents[eventId];
        if (
          !!localStorageEvent &&
          localStorageEvent.userName === localStorageUserName
        ) {
          localStorageData.localStorageEvent = localStorageEvent;
        }
        if (!!localStorageUserName) {
          localStorageData.localStorageUserName = localStorageUserName;
        }

        return Promise.resolve(localStorageData);
      }

      return Promise.reject({});
    } catch (error) {
      return Promise.reject(error);
    }
  };
}

export function editEventScheduledTime(scheduledTime) {
  return async (dispatch, getState) => {
    const state = getState();
    const eventId = selectEventId(state);

    try {
      const response = await editEventScheduledTimeApi({
        eventId,
        scheduledTime
      });

      if (response && response.data && response.data.editEvent) {
        const { code, scheduledTime } = response.data.editEvent;
        dispatch(
          fetchEventSuccess({
            eventId: code,
            scheduledTime
          })
        );
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };
}
