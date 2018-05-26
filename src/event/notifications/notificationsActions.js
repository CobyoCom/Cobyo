import {selectEventId, selectUserName} from '../activeEventSelectors';
import {fetchNotificationsApi} from '../eventApi';

export const types = {
  fetchNotificationsRequest: 'FETCH_NOTIFICATIONS_REQUEST',
  fetchNotificationsSuccess: 'FETCH_NOTIFICATIONS_SUCCESS',
  fetchNotificationsFailure: 'FETCH_NOTIFICATIONS_FAILURE',
  reactToNotificationRequest: 'REACT_TO_NOTIFICATION_REQUEST'
};

/************ FETCH EVENT NOTIFICATIONS ************/

const fetchNotificationsRequest = (eventId) => ({
  type: types.fetchNotificationsRequest,
  payload: {eventId}
});

const fetchNotificationsSuccess = ({eventId, notifications = []}) => ({
  type: types.fetchNotificationsSuccess,
  payload: {eventId, notifications}
});

const fetchNotificationsFailure = (eventId) => ({
  type: types.fetchNotificationsFailure,
  payload: {eventId}
});

export const fetchNotifications = () => (dispatch, getState) => new Promise(async (resolve, reject) => {
  const state = getState();
  const eventId = selectEventId(state);

  dispatch(fetchNotificationsRequest(eventId));

  try {
    const response = await fetchNotificationsApi(eventId);
    if (response &&
      !response.errors &&
      response.data &&
      response.data.event
    ) {
      dispatch(fetchNotificationsSuccess(response.data.event));
      return resolve();
    }

    dispatch(fetchNotificationsFailure(eventId));
    return reject();
  } catch(error) {
    dispatch(fetchNotificationsFailure());
    return reject();
  }
});


/************ REACT TO EVENT NOTIFICATIONS ************/

const reactToNotificationRequest = (notificationId, emoji, userName) => ({
  type: types.reactToNotificationRequest,
  payload: {notificationId, emoji, userName}
});

export const reactToNotification = (notificationId, emoji) => async (dispatch, getState) => {
  const state = getState();
  const userName = selectUserName(state);

  dispatch(reactToNotificationRequest(notificationId, emoji, userName));
};