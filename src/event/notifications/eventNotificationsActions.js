import {get} from '../../helpers/axios';
import {selectEventId, selectUserName} from '../activeEventSelectors';

export const types = {
  fetchEventNotificationsRequest: 'FETCH_EVENT_NOTIFICATIONS_REQUEST',
  fetchEventNotificationsSuccess: 'FETCH_EVENT_NOTIFICATIONS_SUCCESS',
  fetchEventNotificationsFailure: 'FETCH_EVENT_NOTIFICATIONS_FAILURE',
  reactToEventNotificationRequest: 'REACT_TO_EVENT_NOTIFICATION_REQUEST'
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
    const {data} = await get(`/api/events/${eventId}/notifications`);
    dispatch(fetchEventNotificationsSuccess(eventId, data));
  } catch(error) {
    dispatch(fetchEventNotificationsFailure());
  }
};


/************ REACT TO EVENT NOTIFICATIONS ************/

const reactToEventNotificationRequest = (notificationId, emoji, userName) => ({
  type: types.reactToEventNotificationRequest,
  payload: {notificationId, emoji, userName}
});

export const reactToEventNotification = (notificationId, emoji) => async (dispatch, getState) => {
  const state = getState();
  const userName = selectUserName(state);

  dispatch(reactToEventNotificationRequest(notificationId, emoji, userName));
};