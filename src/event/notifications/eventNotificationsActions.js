import axios from 'axios';
import {selectEventId} from '../activeEventSelectors';

export const types = {
  fetchEventNotificationsRequest: 'FETCH_EVENT_NOTIFICATIONS_REQUEST',
  fetchEventNotificationsSuccess: 'FETCH_EVENT_NOTIFICATIONS_SUCCESS',
  fetchEventNotificationsFailure: 'FETCH_EVENT_NOTIFICATIONS_FAILURE'
};

/************ FETCH EVENT NOTIFICATIONS ************/

const fetchEventNotificationsRequest = (eventId) => ({
  type: types.fetchEventNotificationsRequest,
  payload: {eventId}
});

const fetchEventNotificationsSuccess = (eventId, notifications = []) => ({
  type: types.fetchEventNotificationsSuccess,
  payload: {eventId, notifications}
});

const fetchEventNotificationsFailure = (eventId) => ({
  type: types.fetchEventNotificationsFailure,
  payload: {eventId}
});

export const fetchEventNotifications = () => async (dispatch, getState) => {
  const state = getState();
  const eventId = selectEventId(state);

  dispatch(fetchEventNotificationsRequest(eventId));

  try {
    const {data} = await axios.get(`/api/events/${eventId}/notifications`);
    dispatch(fetchEventNotificationsSuccess(eventId, data));
  } catch(error) {
    dispatch(fetchEventNotificationsFailure());
  }
};