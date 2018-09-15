import {
  selectPlaceId,
  selectPlaceName
} from '../create/createEventFormSelectors';
import { editEventApi } from '../event/eventApi';

export const types = {
  editEventFailure: 'EDIT_EVENT_FAILURE'
};

function editEventFailure() {
  return { type: types.editEventFailure };
}

export function editEvent(eventId) {
  return async (dispatch, getState) => {
    const state = getState();
    const placeId = selectPlaceId(state);
    const eventName = selectPlaceName(state);

    try {
      const response = await editEventApi({ eventId, placeId, eventName });
      if (
        !response ||
        !!response.errors ||
        !response.data ||
        !response.data.editEvent
      ) {
        throw new Error();
      }

      // Hard reload for now
      window.location.assign(`/${eventId}`);
    } catch (error) {
      dispatch(editEventFailure());
    }
  };
}
