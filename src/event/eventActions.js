import {get} from '../helpers/axios';
import logger from '../helpers/logger';

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

export const fetchEvent = (eventId) => async (dispatch) => {
  dispatch(fetchEventRequest(eventId));

  try {
    const response = await get(`/api/events/${eventId}`);
    if (response &&
      response.data &&
      Object.keys(response.data).length
    ) {
      const {eventName, placeId, eventTime} = response.data;
      dispatch(fetchEventSuccess(eventId, eventName, placeId, eventTime));
      return;
    }

    logger(`Failed to fetch event ${eventId}`);
    return Promise.reject('Event not found');
  } catch(error) {
    logger(`Fetching event ${eventId} caused an error: ${error}`);

    return Promise.reject(error);
  }
};
