import axios from 'axios';

export const types = {
  createEventRequest: 'CREATE_EVENT_REQUEST',
  createEventSuccess: 'CREATE_EVENT_SUCCESS',
  createEventFailure: 'CREATE_EVENT_FAILURE'
};

const createEventRequest = () => ({
  type: types.createEventRequest
});

// Login thunk
export const createEvent = (placeId, eventTime) => async (dispatch) => {
  dispatch(createEventRequest());

  try {
    const response = await axios.post('/api/events', {
      placeId,
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