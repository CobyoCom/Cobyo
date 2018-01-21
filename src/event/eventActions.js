/*global google*/
import axios from 'axios';
import {formatDateForDatabase, addTime} from '../helpers/moment';
import {selectEventId, selectPlaceId} from './eventSelectors';

export const types = {
  fetchEventRequest: 'FETCH_EVENT_REQUEST',
  fetchEventSuccess: 'FETCH_EVENT_SUCCESS',
  loginEventRequest: 'LOGIN_EVENT_REQUEST',
  loginEventSuccess: 'LOGIN_EVENT_SUCCESS',
  loginEventFailure: 'LOGIN_EVENT_FAILURE',
  fetchLocationRequest: 'FETCH_LOCATION_REQUEST',
  fetchLocationSuccess: 'FETCH_LOCATION_SUCCESS',
  fetchLocationFailure: 'FETCH_LOCATION_FAILURE'
};

const fetchEventRequest = (eventId) => ({
  type: types.fetchEventRequest,
  payload: {eventId}
});

const fetchEventSuccess = (placeId, eventTime) => ({
  type: types.fetchEventSuccess,
  payload: {placeId, eventTime}
});

const loginEventRequest = () => ({
  type: types.loginEventRequest
});

const loginEventSuccess = ({placeId, eventTime, users: attendees}) => ({
  type: types.loginEventSuccess,
  payload: {placeId, eventTime, attendees}
});

const loginEventFailure = () => ({
  type: types.loginEventFailure
});

const fetchLocationRequest = () => ({
  type: types.fetchLocationRequest
});

const fetchLocationSuccess = (coords, timestamp) => ({
  type: types.fetchLocationSuccess,
  payload: {coords, timestamp}
});

const fetchLocationFailure = () => ({
  type: types.fetchLocationFailure
});

export const fetchEvent = (eventId) => async (dispatch) => {
  dispatch(fetchEventRequest(eventId));

  try {
    const response = await axios.get(`/api/events/${eventId}`);
    if (response && response.data) {
      const {placeId, eventTime} = response.data;
      dispatch(fetchEventSuccess(placeId, eventTime));
    }
  } catch(error) {
    return Promise.reject();
  }
};

// Login thunk
export const loginEvent = (userName) => async (dispatch, getState) => {
  dispatch(loginEventRequest());

  const state = getState();
  const eventId = selectEventId(state);
  const placeId = selectPlaceId(state);

  // First fetch user's current location, then login
  const {coordinates, lastUpdatedTime} = await dispatch(fetchLocation());
  let estimatedArrivalTime;

  try {
    const seconds = await dispatch(fetchEstimatedArrivalTime(coordinates, placeId));
    estimatedArrivalTime = addTime(seconds).format('YYYY-MM-DD HH:mm');
  } catch(error) {

  }

  try {
    const response = await axios.post(`/api/events/${eventId}`, {
      userName,
      estimatedArrivalTime,
      lastUpdatedTime
    });
    const data = await response.data;
    dispatch(loginEventSuccess(data));
  } catch(error) {
    dispatch(loginEventFailure());
  }
};

// Fetch user's current location
export const fetchLocation = () => (dispatch) => new Promise((resolve, reject) => {
  dispatch(fetchLocationRequest());

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const {coords: {latitude, longitude}, timestamp} = position;
        const coordinates = {latitude, longitude};
        const lastUpdatedTime = formatDateForDatabase(timestamp);
        dispatch(fetchLocationSuccess(coordinates, lastUpdatedTime));
        return resolve({coordinates, lastUpdatedTime});
      },
      () => {
        dispatch(fetchLocationFailure());
        return reject();
      }
    );
  } else {
    dispatch(fetchLocationFailure());
    return reject();
  }
});

const fetchEstimatedArrivalTime = ({latitude, longitude}, destinationPlaceId) => () => new Promise((resolve, reject) => {
  new google.maps.DistanceMatrixService().getDistanceMatrix({
    origins: [new google.maps.LatLng(latitude, longitude)],
    destinations: [{'placeId': destinationPlaceId}],
    travelMode: 'DRIVING',
    unitSystem: google.maps.UnitSystem.METRIC,
    avoidHighways: false,
    avoidTolls: false
  }, (response, status) => {
    if (status === 'OK' && response && response.rows && response.rows.length) {
      const seconds = response.rows[0].elements[0].duration.value;
      return resolve(seconds);
    }
    return reject();
  });
});
