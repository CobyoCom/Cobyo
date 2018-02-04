/*global google*/
import axios from 'axios';
import {formatDateForDatabase} from '../helpers/moment';
import {
  selectEventId,
  selectPlaceId,
  selectTravelMode,
  selectUserName
} from './activeEventSelectors';

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
  leaveForEventFailure: 'LEAVE_FOR_EVENT_FAILURE'
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

/************ CREATE EVENT ************/

const createEventRequest = () => ({
  type: types.createEventRequest
});

export const createEvent = (placeValue, placeId, eventTime) => async (dispatch) => {
  dispatch(createEventRequest());

  try {
    const response = await axios.post('/api/events', {
      placeId,
      placeName: placeValue,
      eventTime
    });
    if (response && response.data) {
      const {eventId} = response.data;
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
    const response = await axios.get(`/api/events/${eventId}`);
    if (response && response.data) {
      const {placeName, placeId, eventTime} = response.data;
      dispatch(fetchEventSuccess(eventId, placeName, placeId, eventTime));
    }
  } catch(error) {
    return Promise.reject(error);
  }
};

/************ REFRESH EVENT ************/

const refreshEventRequest = (eventId, duration, lastUpdated) => ({
  type: types.refreshEventRequest,
  payload: {eventId, duration, lastUpdated}
});

const refreshEventSuccess = () => ({
  type: types.refreshEventSuccess,
  payload: {}
});

const refreshEventFailure = () => ({
  type: types.refreshEventFailure
});

export const refreshEvent = () => (dispatch, getState) => new Promise(async (resolve, reject) => {
  // Get attendees regardless of whether user successfully updates own information
  dispatch(getAttendees());

  const {coordinates, lastUpdated} = await fetchLocation();

  const state = getState();
  const eventId = selectEventId(state);
  const destinationPlaceId = selectPlaceId(state);
  const travelMode = selectTravelMode(state);
  const userName = selectUserName(state);

  const duration = await fetchTravelDuration({
    eventId,
    coordinates,
    destinationPlaceId,
    travelMode
  });

  dispatch(refreshEventRequest(eventId, duration, lastUpdated));

  try {
    const response = await axios.put(`/api/events/${eventId}/users/${userName}`, {
      userName,
      duration,
      lastUpdated,
      travelMode
    });

    console.log(response);
    // Pass in hasLeft?
    dispatch(refreshEventSuccess());
    resolve();
  } catch(error) {
    dispatch(refreshEventFailure());
    reject();
  }
});

/************ USER LEAVES FOR EVENT ************/

const leaveForEventRequest = (eventId) => ({
  type: types.leaveForEventRequest,
  payload: {eventId}
});

const leaveForEventFailure = (eventId) => ({
  type: types.leaveForEventFailure,
  payload: {eventId}
});

export const leaveForEvent = () => async (dispatch, getState) => {
  const state = getState();
  const eventId = selectEventId(state);
  const userName = selectUserName(state);
  dispatch(leaveForEventRequest(eventId));

  try {
    await axios.put(`/api/events/${eventId}/users/${userName}`, {
      hasLeft: true
    });
  } catch(error) {
    dispatch(leaveForEventFailure(eventId));
  }
};

/************ GET CURRENT USERS LOCATION ************/

const fetchLocation = () => new Promise((resolve, reject) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const {coords: {latitude, longitude}, timestamp} = position;
        const coordinates = {latitude, longitude};
        const lastUpdated = formatDateForDatabase(timestamp);
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

const getAttendeesSuccess = (eventId, data) => ({
  type: types.getAttendeesSuccess,
  payload: {eventId, attendees: data}
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
    const response = await axios.get(`/api/events/${eventId}/users?exclude=${userName}`);
    const data = await response.data;
    dispatch(getAttendeesSuccess(eventId, data));
  } catch(error) {
    dispatch(getAttendeesFailure(eventId));
  }
};