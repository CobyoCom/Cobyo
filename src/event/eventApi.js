/**
 * The API for the Event Page
 *
 * @module eventApi.js
 */
import fetchGraphQL from '../helpers/fetchGraphQL';
import logger from '../helpers/logger';
import {
  eventQuery,
  notificationsQuery,
  eventUsersQuery
} from './eventQueries';
import {
  createEventMutation,
  editEventMutation,
  endEventMutation,
  updateEventUserMutation,
  deleteReactionMutation,
  createReactionMutation
} from './eventMutations';

export async function createEventApi(googlePlaceId, name) {
  const place = {googlePlaceId, address: name};
  try {
    const { data } = await fetchGraphQL({
      query: createEventMutation,
      variables: {event: { place, name }}
    });
    return data;
  } catch (error) {
    logger(`createEventApi ${error.response.status}: ${error.message}`);
    throw new Error();
  }
}

export async function editEventPlaceApi({eventId, placeId, placeName}) {
  try {
    const { data } = await fetchGraphQL({
      query: editEventMutation,
      variables: {
        code: eventId,
        event: {
          name: placeName,
          place: {
            address: placeName,
            googlePlaceId: placeId
          }
        }
      }
    });
    return data;
  } catch (error) {
    logger(`editEventPlaceApi ${error.response.status}: ${error.message}`);
    throw new Error();
  }
}

export async function editEventScheduledTimeApi({eventId, scheduledTime}) {
  try {
    const { data } = await fetchGraphQL({
      query: editEventMutation,
      variables: {
        code: eventId,
        event: {
          scheduledTime: scheduledTime.toString()
        }
      }
    });
    return data;
  } catch (error) {
    logger(`editEventScheduledTimeApi ${error.response.status}: ${error.message}`);
    throw new Error();
  }
}

export async function endEventApi(eventId) {
  try {
    const { data } = await fetchGraphQL({
      query: endEventMutation,
      variables: { eventId }
    });
    return data;
  } catch (error) {
    logger(`endEventApi ${error.response.status}: ${error.message}`);
    throw new Error();
  }
}

export async function fetchEventApi(eventId) {
  try {
    const { data } = await fetchGraphQL({
      query: eventQuery,
      variables: { eventId }
    });
    return data;
  } catch (error) {
    logger(`fetchEventApi ${error.response.status}: ${error.message}`);
    throw new Error();
  }
}

export async function fetchNotificationsApi(eventId) {
  try {
    const { data } = await fetchGraphQL({
      query: notificationsQuery,
      variables: { eventId }
    });
    return data;
  } catch (error) {
    logger(`fetchNotificationsApi ${error.response.status}: ${error.message}`);
    throw new Error();
  }
}

export async function fetchEventUsersApi(eventId) {
  try {
    const { data } = await fetchGraphQL({
      query: eventUsersQuery,
      variables: { eventId }
    });
    return data;
  } catch (error) {
    logger(`fetchEventUsersApi ${error.response.status}: ${error.message}`);
    throw new Error();
  }
}

export async function updateEventUserApi({
  eventId,
  userName,
  duration,
  lastUpdated,
  travelMode
}) {
  const eventUser = {
    userName,
    duration,
    travelMode,
    ...(lastUpdated && {updatedAt: lastUpdated.toString()})
  };
  try {
    const { data } = await fetchGraphQL({
      query: updateEventUserMutation,
      variables: {
        eventCode: eventId,
        eventUser
      }
    });
    if (
      data &&
      data.data &&
      data.data.updateEventUser &&
      data.data.updateEventUser.lastUpdated
    ) {
      // Change back to ms
      data.data.updateEventUser.lastUpdated = parseInt(
        data.data.updateEventUser.lastUpdated,
        10
      );
    }

    return data;
  } catch (error) {
    logger(`updateEventUserApi ${error.response.status}: ${error.message}`);
    throw new Error();
  }
}

export async function reactToNotificationApi(
  eventId,
  notificationIndex,
  userName,
  emoji,
  didUserReact
) {
  try {
    const { data } = await fetchGraphQL({
      query: didUserReact ? deleteReactionMutation : createReactionMutation,
      variables: {
        eventCode: eventId,
        notificationIndex,
        reaction: {userName, emoji}
      }
    });
    return data;
  } catch (error) {
    logger(`reactToNotificationApi ${error.response.status}: ${error.message}`);
    throw new Error();
  }
}
