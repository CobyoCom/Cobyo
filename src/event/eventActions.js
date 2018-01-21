/*global google*/
import axios from 'axios';
import {formatDateForDatabase, addTime} from '../helpers/moment';
import {selectEventId, selectMyETA, selectMyLUT, selectUserName} from './eventSelectors';

export const types = {
  fetchEventRequest: 'FETCH_EVENT_REQUEST',
  fetchEventSuccess: 'FETCH_EVENT_SUCCESS',
  loginEvent: 'LOGIN_EVENT',
  fetchETASuccess: 'FETCH_ETA_SUCCESS',
  getAttendeesSuccess: 'GET_ATTENDEES_SUCCESS',
  getAttendeesFailure: 'GET_ATTENDEES_FAILURE',
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

export const loginEvent = (userName) => ({
  type: types.loginEvent,
  payload: {userName}
});

export const fetchMyETASuccess = (myETA, myLUT) => ({
  type: types.fetchETASuccess,
  payload: {myETA, myLUT}
});


const getAttendeesSuccess = (data) => ({
  type: types.getAttendeesSuccess,
  payload: {attendees: data}
});

const getAttendeesFailure = () => ({
  type: types.getAttendeesFailure
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

export const fetchMyETA = (destinationPlaceId) => (dispatch) => new Promise(async (resolve, reject) => {
  try {
    const {coordinates: {latitude, longitude}, myLUT} = await dispatch(fetchLocation());

    new google.maps.DistanceMatrixService().getDistanceMatrix({
      origins: [new google.maps.LatLng(latitude, longitude)],
      destinations: [{'placeId': destinationPlaceId}],
      travelMode: 'WALKING',
      unitSystem: google.maps.UnitSystem.METRIC,
      avoidHighways: false,
      avoidTolls: false
    }, (response, status) => {
      if (status === 'OK' && response && response.rows && response.rows.length) {
        const seconds = response.rows[0].elements[0].duration.value;
        const myETA = addTime(seconds).format('YYYY-MM-DD HH:mm');

        dispatch(fetchMyETASuccess(myETA, myLUT));
      }
    });
  } catch(error) {

  }
});

export const getAttendees = () => async (dispatch, getState) => {
  const state = getState();

  try {
    const response = await axios.post(`/api/events/${selectEventId(state)}`, {
      userName: selectUserName(state),
      estimatedArrivalTime: selectMyETA(state),
      lastUpdatedTime: selectMyLUT(state)
    });
    const data = await response.data;
    dispatch(getAttendeesSuccess(data));
  } catch(error) {
    dispatch(getAttendeesFailure());
  }
};