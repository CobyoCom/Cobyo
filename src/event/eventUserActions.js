import fetchDurationGoogle from "../locationServices/fetchDurationGoogle";
import fetchCurrentCoordinates from "../locationServices/fetchCurrentCoordinates";
import { makeSelectEventGooglePlaceId } from "./eventSelectors";
import { initGoogleMapsAPI } from "../actions/googleMapsActions";

export const types = {
  fetchCoordinatesSuccess: "FETCH_COORDINATES_SUCCESS",
  fetchDurationSuccess: "FETCH_DURATION_SUCCESS"
};

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

export function changeTravelMode({ code, travelMode }) {
  return async (dispatch, getState) => {
    let latitude, longitude, timestamp;

    // Step 1: Find my current position
    try {
      const position = await fetchCurrentCoordinates();
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      timestamp = position.timestamp;
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
            updatedTime: timestamp
          }
        })
      );
    } catch (error) {}
  };
}
