import {post} from '../helpers/axios';
import logger from '../helpers/logger';
import {getItem} from '../helpers/localStorage';
import {selectPlaceId, selectPlaceName} from './createEventFormSelectors';

export const types = {
  selectPlace: 'SELECT_PLACE',
  createEventSuccess: 'CREATE_EVENT_SUCCESS',
  createEventFailure: 'CREATE_EVENT_FAILURE'
};

export function selectPlace(placeName, placeId) {
  return {
    type: types.selectPlace,
    payload: {placeName, placeId}
  };
}

function createEventSuccess() {
  return {type: types.createEventSuccess};
}

function createEventFailure() {
  return {type: types.createEventFailure};
}

export const createEvent = () => async (dispatch, getState) => {
  const state = getState();
  const placeId = selectPlaceId(state);
  const placeName = selectPlaceName(state);

  try {
    const eventTime = (new Date()).getTime();
    const response = await post('/api/events', {
      placeId,
      eventName: placeName,
      eventTime
    });

    if (response && response.data) {
      const {id: eventId} = response.data;
      const localStoragePlaces = {
        ...getItem('places', true),
        [placeName]: {
          placeId,
          eventTime
        }
      };
      localStorage.setItem('places', JSON.stringify(localStoragePlaces));
      dispatch(createEventSuccess());

      return Promise.resolve(eventId);
    }

    return Promise.reject();
  } catch(error) {
    logger(`Failed to create event: ${error}`);
    dispatch(createEventFailure());

    return Promise.reject();
  }
};
