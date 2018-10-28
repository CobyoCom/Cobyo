import fetchDurationGoogleApi from "../locationServices/fetchDurationGoogleApi";
import fetchCurrentCoordinatesApi from "../locationServices/fetchCurrentCoordinatesApi";
import {
  makeSelectEventGooglePlaceId,
  makeSelectEventMe
} from "./eventSelectors";
import { initGoogleMapsAPI } from "../actions/googleMapsActions";
import { updateEventUserApi } from "./eventUserApi";
import {
  selectActiveEventCode,
  selectActiveEventMyTravelMode
} from "./activeEventSelectors";

export const types = {
  toggleShowTravelModeSelect: "TOGGLE_SHOW_TRAVEL_MODE_SELECT",
  refreshMeRequest: "REFRESH_ME_REQUEST",
  fetchCoordinatesSuccess: "FETCH_COORDINATES_SUCCESS",
  fetchDurationSuccess: "FETCH_DURATION_SUCCESS",
  updateEventUserSuccess: "UPDATE_EVENT_USER_SUCCESS"
};

export function toggleShowTravelModeSelect(payload) {
  return {
    type: types.toggleShowTravelModeSelect,
    payload
  };
}

function fetchCoordinates() {
  return async dispatch => {
    try {
      const position = await fetchCurrentCoordinatesApi();
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const timestamp = position.timestamp.toString();
      dispatch({
        type: types.fetchCoordinatesSuccess,
        payload: {
          latitude,
          longitude,
          timestamp
        }
      });
      return Promise.resolve({ latitude, longitude, timestamp });
    } catch (error) {
      return Promise.reject();
    }
  };
}

function fetchDuration({ code, travelMode, latitude, longitude, timestamp }) {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const placeId = makeSelectEventGooglePlaceId(state)(code);
      const duration = await fetchDurationGoogleApi({
        latitude,
        longitude,
        placeId,
        travelMode
      });
      dispatch({
        type: types.fetchDurationSuccess,
        payload: {
          code,
          eventUser: {
            duration,
            travelMode,
            updatedTime: timestamp,
            hasLeft: false
          }
        }
      });
    } catch (error) {}
  };
}

function updateEventUser(code) {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const me = makeSelectEventMe(state)(code);
      const { user, ...eventUser } = me;
      const response = await updateEventUserApi({
        code,
        eventUser
      });
      dispatch({
        type: types.updateEventUserSuccess,
        payload: { code, eventUser: response.data.updateEventUser }
      });
    } catch (error) {}
  };
}

export function refreshMe(initialCode = null, initialTravelMode = null) {
  return async (dispatch, getState) => {
    const state = getState();
    const code = initialCode || selectActiveEventCode(state);
    const travelMode =
      initialTravelMode || selectActiveEventMyTravelMode(state);

    dispatch({ type: types.refreshMeRequest });
    let latitude, longitude, timestamp;

    // Step 1: Find my current position
    try {
      const response = await dispatch(fetchCoordinates());
      latitude = response.latitude;
      longitude = response.longitude;
      timestamp = response.timestamp;
    } catch (error) {}

    // Step 2: Load Google Maps API
    try {
      await dispatch(initGoogleMapsAPI());
    } catch (error) {}

    // Step 3: Find the time duration between my position and the destination
    try {
      await dispatch(
        fetchDuration({ code, travelMode, latitude, longitude, timestamp })
      );
    } catch (error) {}

    // Step 4: Send the update to the backend
    try {
      await dispatch(updateEventUser(code));
    } catch (error) {}
  };
}
