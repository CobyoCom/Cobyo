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

function createEventSuccess() {
  return { type: types.createEventSuccess };
}

function createEventFailure() {
  return { type: types.createEventFailure };
}

export function createEvent({ place, name, scheduledTime }) {
  return async dispatch => {
    try {
      const response = await createEventApi({
        place,
        name,
        scheduledTime
      });
      const event = response.data.createEvent;
      if (event && event.code) {
        dispatch(createEventSuccess());
        return Promise.resolve(event.code);
      }

      dispatch(createEventFailure());
      return Promise.reject();
    } catch (error) {
      dispatch(createEventFailure());
      return Promise.reject();
    }
  };
}

function editEventSuccess() {
  return { type: types.editEventSuccess };
}

function editEventFailure() {
  return { type: types.editEventFailure };
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
        dispatch(editEventSuccess());
        return Promise.resolve(event.code);
      }

      dispatch(editEventFailure());
      return Promise.reject();
    } catch (error) {
      return Promise.reject();
    }
  };
}
