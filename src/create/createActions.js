import types from './createActionTypes';

const createEventRequest = () => ({
  type: types.createEventRequest
});

const createEventSuccess = ({placeText}) => ({
  type: types.createEventSuccess,
  payload: {placeText}
});

const createEventFailure = () => ({
  type: types.createEventFailure
});

// Login thunk
export const createEvent = () => (dispatch) => new Promise((resolve, reject) => {
  dispatch(createEventRequest());

});