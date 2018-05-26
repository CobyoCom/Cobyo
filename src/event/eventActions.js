import {fetchEventApi} from './eventApi';
import {getItem} from "../helpers/localStorage";

export const types = {
  fetchEventRequest: 'FETCH_EVENT_REQUEST',
  fetchEventSuccess: 'FETCH_EVENT_SUCCESS'
};

/************ FETCH EVENT ************/

const fetchEventRequest = (eventId) => ({
  type: types.fetchEventRequest,
  payload: {eventId}
});

const fetchEventSuccess = (eventId, location, placeId, eventTime) => ({
  type: types.fetchEventSuccess,
  payload: {eventId, location, placeId, eventTime}
});

export function fetchEvent(eventId) {
  return async (dispatch) => {
    dispatch(fetchEventRequest(eventId));

    try {
      const response = await fetchEventApi(eventId);
      if (response &&
          !response.errors &&
          response.data &&
          response.data.event
      ) {
        const {eventId, eventName, placeId} = response.data.event;
        dispatch(fetchEventSuccess(eventId, eventName, placeId));

        const localStorageData = {};
        const localStorageEvents = getItem('events', true);
        const localStorageUserName = getItem('userName');

        const localStorageEvent = !!localStorageEvents && localStorageEvents[eventId];
        if (!!localStorageEvent && localStorageEvent.userName === localStorageUserName) {
          localStorageData.localStorageEvent = localStorageEvent;
        }
        if (!!localStorageUserName) {
          localStorageData.localStorageUserName = localStorageUserName;
        }

        return Promise.resolve(localStorageData);
      }

      return Promise.reject();
    } catch (error) {
      return Promise.reject(error);
    }
  };
}