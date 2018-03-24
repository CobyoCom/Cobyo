import {post} from '../helpers/axios';
import logger from '../helpers/logger';
import {selectPlaceId, selectPlaceName} from './createEventFormSelectors';

export const types = {
  selectPlace: 'SELECT_PLACE',
  createEventFailure: 'CREATE_EVENT_FAILURE'
};

export function selectPlace(placeName, placeId) {
  return {
    type: types.selectPlace,
    payload: {placeName, placeId}
  };
}

function createEventFailure() {
  return {type: types.createEventFailure};
}

export const createEvent = () => async (dispatch, getState) => {
  const state = getState();
  const placeId = selectPlaceId(state);
  const placeName = selectPlaceName(state);

  try {
    const response = await post('/api/events', {
      placeId,
      eventName: placeName,
      eventTime: new Date()
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
