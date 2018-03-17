/*global google*/

import {get, put} from '../helpers/axios';
import logger from '../helpers/logger';
import {
  selectDuration,
  selectEventId, selectEventLocation, selectHasLeft, selectLastUpdated,
  selectPlaceId,
  selectTravelMode,
  selectUserName
} from './activeEventSelectors';
import {selectIsGoogleAPILoaded} from '../reducers/appState/appStateSelectors';
import {fetchEventNotifications} from './notifications/eventNotificationsActions';
import {initGoogleMapsAPI} from '../actions/googleMapsActions';

export const types = {
  loginEventSuccess: 'LOGIN_EVENT_SUCCESS',
  fetchEventRequest: 'FETCH_EVENT_REQUEST',
  fetchEventSuccess: 'FETCH_EVENT_SUCCESS',
  refreshEventRequest: 'REFRESH_EVENT_REQUEST',
  refreshEventSuccess: 'REFRESH_EVENT_SUCCESS',
  refreshEventFailure: 'REFRESH_EVENT_FAILURE',
  fetchTravelDurationFailure: 'FETCH_TRAVEL_DURATION_FAILURE',
  getAttendeesSuccess: 'GET_ATTENDEES_SUCCESS',
  getAttendeesFailure: 'GET_ATTENDEES_FAILURE',
  leaveForEventRequest: 'LEAVE_FOR_EVENT_REQUEST',
  leaveForEventFailure: 'LEAVE_FOR_EVENT_FAILURE',
  changeTravelModeSuccess: 'CHANGE_TRAVEL_MODE_SUCCESS'
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

const fetchTravelDurationFailure = () => ({
  type: types.fetchTravelDurationFailure
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
  const isGoogleAPILoaded = selectIsGoogleAPILoaded(state);

  if (!isGoogleAPILoaded) {
    try {
      await dispatch(initGoogleMapsAPI());
    } catch (error) {
      return;
    }
  }

  let duration;
  try {
    duration = await fetchTravelDuration({
      eventId,
      coordinates,
      destinationPlaceId,
      travelMode
    });
  } catch (error) {
    logger(`Failed to fetch travel duration: ${error}`);
    dispatch(fetchTravelDurationFailure());
    return;
  }

  try {
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
    logger(`Failed to refresh event: ${error}`);
    dispatch(refreshEventFailure(eventId, prevDuration, prevLastUpdated, prevHasLeft));
    reject();
  }
});

/************ LOGIN EVENT ************/

const loginEventSuccess = (eventId, userName, travelMode) => ({
  type: types.loginEventSuccess,
  payload: {eventId, userName, travelMode}
});

/**
 * No network request is made, but we want to save some data to local storage.
 *
 * @param {number} eventId
 * @param {string} userName
 * @param {string} travelMode
 */
export const loginEvent = (eventId, userName, travelMode) => (dispatch, getState) => new Promise((resolve) => {
  const state = getState();
  const location = selectEventLocation(state);
  const localStorageEvents = localStorage.getItem('events');
  const localStorageEventIds = localStorage.getItem('eventIds');

  if (localStorageEvents && localStorageEventIds) {
    const events = JSON.parse(localStorageEvents);
    events[eventId] = {
      ...events[eventId],
      eventId,
      userName,
      travelMode,
      location
    };
    localStorage.setItem('events', JSON.stringify(events));
    localStorage.setItem('eventIds', JSON.stringify(
      Object.values(events).map(event => event.eventId)
    ));
  } else {
    // Nothing in local storage
    localStorage.setItem('events', JSON.stringify({
      [eventId]: {
        eventId,
        userName,
        travelMode,
        location
      }
    }));
    localStorage.setItem('eventIds', JSON.stringify([eventId]));
  }

  localStorage.setItem('userName', userName);
  dispatch(loginEventSuccess(eventId, userName, travelMode));
  resolve();
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
    logger(`Failed to leave event: ${error}`);
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
        return resolve({coordinates, lastUpdated: timestamp});
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
        return resolve(duration.value * 1000);
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
    const attendees = response.data;
    dispatch(getAttendeesSuccess(eventId, attendees || []));
  } catch(error) {
    dispatch(getAttendeesFailure(eventId));
  }
};

/************ CHANGE TRAVEL MODE ************/

const changeTravelModeSuccess = (eventId, travelMode) => ({
  type: types.changeTravelModeSuccess,
  payload: {eventId, travelMode}
});

export const changeTravelMode = (eventId, travelMode) => (dispatch) => new Promise((resolve) => {
  const localStorageEvents = localStorage.getItem('events');
  if (localStorageEvents) {
    const events = JSON.parse(localStorageEvents);
    if (events[eventId]) {
      events[eventId] = {
        ...events[eventId],
        travelMode
      };
      localStorage.setItem('events', JSON.stringify(events));
    }
  }

  dispatch(changeTravelModeSuccess(eventId, travelMode));
  resolve();
});

