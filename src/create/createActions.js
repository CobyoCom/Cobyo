import logger from '../helpers/logger';
import {getItem} from '../helpers/localStorage';
import {selectPlaceId, selectPlaceName} from './createEventFormSelectors';
import {createEventApi} from '../event/eventApi';

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
    const response = await createEventApi(placeId, placeName);
    if (response &&
      !response.errors &&
      response.data &&
      response.data.createEvent
    ) {
      const {eventId, eventName, placeId} = response.data.createEvent;
      dispatch(createEventSuccess());

      const localStoragePlaces = {
        ...getItem('places', true),
        [eventName]: {
          placeId
        }
      };
      localStorage.setItem('places', JSON.stringify(localStoragePlaces));

      return Promise.resolve(eventId);
    }

    dispatch(createEventFailure());
    return Promise.reject();
  } catch(error) {
    logger(`Failed to create event: ${error}`);
    dispatch(createEventFailure());

    return Promise.reject();
  }
};
