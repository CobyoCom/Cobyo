import {post} from '../helpers/axios';
import logger from '../helpers/logger';

export const types = {
  createEventFailure: 'CREATE_EVENT_FAILURE'
};

function createEventFailure() {
  return {type: types.createEventFailure};
}

export const createEvent = (placeValue, placeId, eventTime) => async (dispatch) => {
  try {
    const response = await post('/api/events', {
      placeId,
      eventName: placeValue,
      eventTime
    });

    if (response && response.data) {
      const {id: eventId} = response.data;
      return Promise.resolve(eventId);
    }

    return Promise.reject();
  } catch(error) {
    logger(`Failed to create event: ${error}`);
    dispatch(createEventFailure());

    return Promise.reject();
  }
};
