import { createEventApi, editEventApi } from "./createEventApi";

export const types = {
  selectPlace: "SELECT_PLACE",
  createEventSuccess: "CREATE_EVENT_SUCCESS",
  createEventFailure: "CREATE_EVENT_FAILURE",
  editEventSuccess: "EDIT_EVENT_SUCCESS",
  editEventFailure: "EDIT_EVENT_FAILURE"
};

export function selectPlace(name, placeId) {
  return {
    type: types.selectPlace,
    payload: { name, placeId }
  };
}

export function createEvent(event) {
  return async dispatch => {
    try {
      const response = await createEventApi(event);
      if (response.data.createEvent) {
        const code = response.data.createEvent.code;
        dispatch({
          type: types.createEventSuccess,
          payload: { code }
        });
        return Promise.resolve(code);
      }

      dispatch({ type: types.createEventFailure });
      return Promise.reject();
    } catch (error) {
      dispatch({ type: types.createEventFailure });
      return Promise.reject();
    }
  };
}

export function editEvent({ code, place, name, scheduledTime }) {
  return async dispatch => {
    try {
      const response = await editEventApi({
        code,
        event: { place, name, scheduledTime }
      });
      const event = response.data.editEvent;
      if (event && event.code) {
        dispatch({
          type: types.editEventSuccess,
          payload: event
        });
        return Promise.resolve(event.code);
      }

      dispatch({ type: types.editEventFailure });
      return Promise.reject();
    } catch (error) {
      return Promise.reject();
    }
  };
}
