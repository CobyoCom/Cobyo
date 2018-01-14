import axios from 'axios';

export const types = {
  loginEventRequest: 'LOGIN_EVENT_REQUEST',
  loginEventSuccess: 'LOGIN_EVENT_SUCCESS',
  loginEventFailure: 'LOGIN_EVENT_FAILURE',
  fetchLocationRequest: 'FETCH_LOCATION_REQUEST',
  fetchLocationSuccess: 'FETCH_LOCATION_SUCCESS',
  fetchLocationFailure: 'FETCH_LOCATION_FAILURE'
};

const loginEventRequest = () => ({
  type: types.loginEventRequest
});

const loginEventSuccess = ({placeText}) => ({
  type: types.loginEventSuccess,
  payload: {placeText}
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

// Login thunk
export const loginEvent = (userName) => (dispatch) => {
  dispatch(loginEventRequest());

  // First fetch user's current location, then login
  dispatch(fetchLocation()).then((coordinates, timestamp) =>
    axios.post('/api/', { // TODO
      userName,
      coordinates,
      timestamp
    })
      .then((response) => {
        // Expect list of users and their respective ETA's
        dispatch(loginEventSuccess());
      })
      .catch((error) => {
        dispatch(loginEventFailure());
      })
  );
};

// Fetch user's current location
export const fetchLocation = () => (dispatch) => new Promise((resolve, reject) => {
  dispatch(fetchLocationRequest());

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const {coords: {latitude, longitude}, timestamp} = position;
        const coordinates = {latitude, longitude};
        dispatch(fetchLocationSuccess(coordinates, timestamp));
        resolve(coordinates, timestamp);
      },
      () => {
        dispatch(fetchLocationFailure());
        reject();
      }
    );
  } else {
    dispatch(fetchLocationFailure());
    reject();
  }
});