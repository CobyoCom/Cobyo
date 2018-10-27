import fetchDurationGoogle from "../locationServices/fetchDurationGoogle";
import fetchCurrentCoordinates from "../locationServices/fetchCurrentCoordinates";
import {
  makeSelectEventGooglePlaceId,
  makeSelectEventMe
} from "./eventSelectors";
import { initGoogleMapsAPI } from "../actions/googleMapsActions";
import { updateEventUserApi } from "./eventUserApi";

export const types = {
  toggleShowTravelModeSelect: "TOGGLE_SHOW_TRAVEL_MODE_SELECT",
  changeTravelModeRequest: "CHANGE_TRAVEL_MODE_REQUEST",
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

function changeTravelModeRequest() {
  return { type: types.changeTravelModeRequest };
}

function fetchCoordinatesSuccess({ latitude, longitude, timestamp }) {
  return {
    type: types.fetchCoordinatesSuccess,
    payload: {
      latitude,
      longitude,
      timestamp
    }
  };
}

function fetchDurationSuccess({ code, eventUser }) {
  return {
    type: types.fetchDurationSuccess,
    payload: { code, eventUser }
  };
}

function updateEventUserSuccess({ code, eventUser }) {
  return {
    type: types.updateEventUserSuccess,
    payload: { code, eventUser }
  };
}

export function changeTravelMode({ code, travelMode }) {
  return async (dispatch, getState) => {
    dispatch(changeTravelModeRequest());
    let latitude, longitude, timestamp;

    // Step 1: Find my current position
    try {
      const position = await fetchCurrentCoordinates();
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      timestamp = position.timestamp.toString();
      dispatch(
        fetchCoordinatesSuccess({
          latitude,
          longitude,
          timestamp
        })
      );
    } catch (error) {}

    // Step 2: Load Google Maps API
    try {
      await dispatch(initGoogleMapsAPI());
    } catch (error) {}

    // Step 3: Find the time duration between my position and the destination
    try {
      const state = getState();
      const placeId = makeSelectEventGooglePlaceId(state)(code);
      const duration = await fetchDurationGoogle({
        latitude,
        longitude,
        placeId,
        travelMode
      });
      dispatch(
        fetchDurationSuccess({
          code,
          eventUser: {
            duration,
            travelMode,
            updatedTime: timestamp,
            hasLeft: false
          }
        })
      );
    } catch (error) {}

    // Step 4: Send the update to the backend
    try {
      const state = getState();
      const me = makeSelectEventMe(state)(code);
      const { user, ...eventUser } = me;
      const response = await updateEventUserApi({
        code,
        eventUser
      });
      dispatch(
        updateEventUserSuccess({
          code,
          eventUser: response.data.updateEventUser
        })
      );
    } catch (error) {}
  };
}
