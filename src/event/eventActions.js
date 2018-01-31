/*global google*/
import axios from 'axios';
import {getErrorMessage} from '../helpers/googlemaps';
import {formatDateForDatabase, addTime} from '../helpers/moment';
import {
  selectEventId, selectMyETA, selectMyLUT, selectPlaceId, selectTravelMode,
  selectUserName
} from './activeEventSelectors';

export const types = {
  createEventRequest: 'CREATE_EVENT_REQUEST',
  createEventSuccess: 'CREATE_EVENT_SUCCESS',
  createEventFailure: 'CREATE_EVENT_FAILURE',
  fetchEventRequest: 'FETCH_EVENT_REQUEST',
  fetchEventSuccess: 'FETCH_EVENT_SUCCESS',
  setTravelMode: 'SET_TRAVEL_MODE',
  loginEvent: 'LOGIN_EVENT',
  fetchMyETASuccess: 'FETCH_MY_ETA_SUCCESS',
  fetchMyETAFailure: 'FETCH_MY_ETA_FALIURE',
  getAttendeesSuccess: 'GET_ATTENDEES_SUCCESS',
  getAttendeesFailure: 'GET_ATTENDEES_FAILURE',
  fetchLocationRequest: 'FETCH_LOCATION_REQUEST',
  fetchLocationSuccess: 'FETCH_LOCATION_SUCCESS',
  fetchLocationFailure: 'FETCH_LOCATION_FAILURE'
};

const createEventRequest = () => ({
  type: types.createEventRequest
});

const fetchEventRequest = (eventId) => ({
  type: types.fetchEventRequest,
  payload: {eventId}
});

const fetchEventSuccess = (eventId, placeName, placeId, eventTime) => ({
  type: types.fetchEventSuccess,
  payload: {eventId, placeName, placeId, eventTime}
});

export const setTravelMode = (eventId, travelMode) => ({
  type: types.setTravelMode,
  payload: {eventId, travelMode}
});

export const loginEvent = (eventId, userName) => ({
  type: types.loginEvent,
  payload: {eventId, userName}
});

export const fetchMyETASuccess = (eventId, myETA, myLUT) => ({
  type: types.fetchMyETASuccess,
  payload: {eventId, myETA, myLUT}
});

export const fetchMyETAFailure = (eventId, errorMessage) => ({
  type: types.fetchMyETAFailure,
  payload: {eventId, errorMessage}
});


const getAttendeesSuccess = (eventId, data) => ({
  type: types.getAttendeesSuccess,
  payload: {eventId, attendees: data}
});

const getAttendeesFailure = (eventId) => ({
  type: types.getAttendeesFailure,
  payload: {eventId}
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

// Fetch user's current location
const fetchLocation = () => (dispatch) => new Promise((resolve, reject) => {
  dispatch(fetchLocationRequest());

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const {coords: {latitude, longitude}, timestamp} = position;
        const coordinates = {latitude, longitude};
        const myLUT = formatDateForDatabase(timestamp);
        dispatch(fetchLocationSuccess(coordinates, myLUT));
        return resolve({coordinates, myLUT});
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

export const fetchMyETA = () => (dispatch, getState) => new Promise(async (resolve, reject) => {
  const state = getState();
  const destinationPlaceId = selectPlaceId(state);
  const eventId = selectEventId(state);
  const travelMode = selectTravelMode(state);

  try {
    const {coordinates: {latitude, longitude}, myLUT} = await dispatch(fetchLocation());
    console.log(travelMode);
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
          const {value: seconds} = duration;
          const myETA = addTime(seconds).format('YYYY-MM-DD HH:mm');

          dispatch(fetchMyETASuccess(eventId, myETA, myLUT));
          return resolve();
        }

        dispatch(fetchMyETAFailure(eventId, getErrorMessage(status)));
        return reject();
      }

      dispatch(fetchMyETAFailure(eventId, getErrorMessage(status)));
      return reject();
    });
  } catch(error) {
    dispatch(fetchMyETAFailure(eventId, getErrorMessage(JSON.stringify(error))));
    return reject();
  }
});

export const getAttendees = () => async (dispatch, getState) => {
  const state = getState();
  const eventId = selectEventId(state);

  try {
    const response = await axios.post(`/api/events/${eventId}`, {
      userName: selectUserName(state),
      estimatedArrivalTime: selectMyETA(state),
      lastUpdatedTime: selectMyLUT(state),
      travelMode: selectTravelMode(state)
    });
    const data = await response.data;
    dispatch(getAttendeesSuccess(eventId, data));
  } catch(error) {
    dispatch(getAttendeesFailure(eventId));
  }
};