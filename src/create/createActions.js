import {post} from '../helpers/axios';

export const createEvent = (placeValue, placeId, eventTime) => async () => {
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
    return Promise.reject();
  }
};
