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
  endEventMutation,
  updateEventUserMutation,
  deleteReactionMutation,
  createReactionMutation
} from './eventMutations';

export async function createEventApi(placeId, eventName) {
  try {
    const { data } = await fetchGraphQL({
      query: createEventMutation,
      variables: { placeId, eventName }
    });
    return data;
  } catch (error) {
    logger(`fetchEventApi ${error.response.status}: ${error.message}`);
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
    logger();
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

export async function updateEventUserApi(eventUser) {
  if (eventUser.lastUpdated) {
    eventUser.updatedAt = `${eventUser.lastUpdated}`;
  }

  try {
    const { data } = await fetchGraphQL({
      query: updateEventUserMutation,
      variables: eventUser
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
  notificationCreatedAt,
  userName,
  emoji,
  didUserReact
) {
  try {
    const { data } = await fetchGraphQL({
      query: didUserReact ? deleteReactionMutation : createReactionMutation,
      variables: { eventId, notificationCreatedAt, userName, emoji }
    });

    return data;
  } catch (error) {
    logger(`reactToNotificationApi ${error.response.status}: ${error.message}`);
    throw new Error();
  }
}
