/*global google*/
import {get, post, put} from '../helpers/axios';
import {formatDate} from '../helpers/moment';
import {
  selectDuration,
  selectEventId, selectHasLeft, selectLastUpdated,
  selectPlaceId,
  selectTravelMode,
  selectUserName
} from './activeEventSelectors';
import {fetchEventNotifications} from './EventNotifications/eventNotificationsActions';

export const types = {
  setTravelMode: 'SET_TRAVEL_MODE',
  loginEvent: 'LOGIN_EVENT',
  createEventRequest: 'CREATE_EVENT_REQUEST',
  fetchEventRequest: 'FETCH_EVENT_REQUEST',
  fetchEventSuccess: 'FETCH_EVENT_SUCCESS',
  refreshEventRequest: 'REFRESH_EVENT_REQUEST',
  refreshEventSuccess: 'REFRESH_EVENT_SUCCESS',
  refreshEventFailure: 'REFRESH_EVENT_FAILURE',
  getAttendeesSuccess: 'GET_ATTENDEES_SUCCESS',
  getAttendeesFailure: 'GET_ATTENDEES_FAILURE',
  leaveForEventRequest: 'LEAVE_FOR_EVENT_REQUEST',
  leaveForEventFailure: 'LEAVE_FOR_EVENT_FAILURE',
  changeTravelMode: 'CHANGE_TRAVEL_MODE'
};

/************ ACTIONS TO EXPORT ************/

export const setTravelMode = (eventId, travelMode) => ({
  type: types.setTravelMode,
  payload: {eventId, travelMode}
});

export const loginEvent = (eventId, userName) => ({
  type: types.loginEvent,
  payload: {eventId, userName}
});

export const changeTravelMode = (eventId, travelMode) => ({
  type: types.changeTravelMode,
  payload: {eventId, travelMode}
});

/************ CREATE EVENT ************/

const createEventRequest = () => ({
  type: types.createEventRequest
});

export const createEvent = (placeValue, placeId, eventTime) => async (dispatch) => {
  dispatch(createEventRequest());

  try {
    const response = await post('/api/events', {
      placeId,
      eventName: placeValue,
      eventTime
    });
    if (response && response.data) {
      const {id: eventId} = response.data;
      return Promise.resolve(eventId);
    }
    return Promise.reject();
  } catch(error) {
    return Promise.reject();
  }
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
    if (response && response.data) {
      const {eventName, placeId, eventTime} = response.data;
      dispatch(fetchEventSuccess(eventId, eventName, placeId, eventTime));
    }
  } catch(error) {
    return Promise.reject(error);
  }
};

/************ REFRESH EVENT ************/

const refreshEventRequest = () => ({
  type: types.refreshEventRequest
});

const refreshEventSuccess = (eventId, duration, lastUpdated, hasLeft = false) => ({
  type: types.refreshEventSuccess,
  payload: {eventId, duration, lastUpdated, hasLeft}
});

const refreshEventFailure = (eventId, duration, lastUpdated, hasLeft = false) => ({
  type: types.refreshEventFailure,
  payload: {eventId, duration, lastUpdated, hasLeft}
});

export const refreshEvent = () => (dispatch, getState) => new Promise(async (resolve, reject) => {
  dispatch(refreshEventRequest());

  const prevState = getState();
  const prevDuration = selectDuration(prevState);
  const prevLastUpdated = selectLastUpdated(prevState);
  const prevHasLeft = selectHasLeft(prevState);
  const {coordinates, lastUpdated} = await fetchLocation();
  const state = getState();
  const eventId = selectEventId(state);
  const destinationPlaceId = selectPlaceId(state);
  const travelMode = selectTravelMode(state);
  const userName = selectUserName(state);

  try {
    const duration = await fetchTravelDuration({
      eventId,
      coordinates,
      destinationPlaceId,
      travelMode
    });

    const response = await put(`/api/events/${eventId}/users/${userName}`, {
      userName,
      duration,
      lastUpdated,
      travelMode
    });

    dispatch(refreshEventSuccess(eventId, response.data.duration, response.data.lastUpdated, response.data.hasLeft));

    // When we want to get attendees and notifications async outside the control of clicking refresh, move this to its
    // respective components' componentDidMount functions
    dispatch(getAttendees());
    dispatch(fetchEventNotifications());
    resolve();
  } catch(error) {
    dispatch(refreshEventFailure(eventId, prevDuration, prevLastUpdated, prevHasLeft));
    reject();
  }
});

/************ USER LEAVES FOR EVENT ************/

const leaveForEventRequest = (eventId, hasLeft) => ({
  type: types.leaveForEventRequest,
  payload: {eventId, hasLeft}
});

const leaveForEventFailure = (eventId, hasLeft) => ({
  type: types.leaveForEventFailure,
  payload: {eventId, hasLeft}
});

export const leaveForEvent = (hasLeft = true) => async (dispatch, getState) => {
  const state = getState();
  const prevHasLeft = selectHasLeft(state);
  const eventId = selectEventId(state);
  const userName = selectUserName(state);
  dispatch(leaveForEventRequest(eventId, hasLeft));

  try {
    await put(`/api/events/${eventId}/users/${userName}`, {
      hasLeft
    });
  } catch(error) {
    dispatch(leaveForEventFailure(eventId, prevHasLeft));
  }
};

/************ GET CURRENT USERS LOCATION ************/

const fetchLocation = () => new Promise((resolve, reject) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const {coords: {latitude, longitude}, timestamp} = position;
        const coordinates = {latitude, longitude};
        const lastUpdated = formatDate(timestamp);
        return resolve({coordinates, lastUpdated});
      },
      () => {
        return reject();
      }
    );
  } else {
    return reject();
  }
});

/************ FETCH TRAVEL DURATION ************/

const fetchTravelDuration = ({
  eventId,
  coordinates,
  destinationPlaceId,
  travelMode
}) => new Promise(async (resolve, reject) => {
  const {latitude, longitude} = coordinates;

  new google.maps.DistanceMatrixService().getDistanceMatrix({
    origins: [new google.maps.LatLng(latitude, longitude)],
    destinations: [{'placeId': destinationPlaceId}],
    travelMode,
    unitSystem: google.maps.UnitSystem.METRIC,
    avoidHighways: false,
    avoidTolls: false
  }, (response, status) => {
    if (status === 'OK' &&
        response && response.rows &&
        response.rows.length &&
        response.rows[0].elements &&
        response.rows[0].elements.length
    ) {
      const {duration, status} = response.rows[0].elements[0];
      if (status === 'OK') {
        return resolve(duration.value);
      }

      return reject();
    }

    return reject();
  });
});

/************ GET EVENT ATTENDEES ************/

const getAttendeesSuccess = (eventId, attendees) => ({
  type: types.getAttendeesSuccess,
  payload: {eventId, attendees}
});

const getAttendeesFailure = (eventId) => ({
  type: types.getAttendeesFailure,
  payload: {eventId}
});

const getAttendees = () => async (dispatch, getState) => {
  const state = getState();
  const eventId = selectEventId(state);
  const userName = selectUserName(state);

  try {
    const response = await get(`/api/events/${eventId}/users?sortBy=userName&exclude=${userName}`);
    const attendees = await response.data;
    dispatch(getAttendeesSuccess(eventId, attendees));
  } catch(error) {
    dispatch(getAttendeesFailure(eventId));
  }
};