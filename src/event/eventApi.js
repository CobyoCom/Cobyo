/**
 * The API for the Event Page
 *
 * @module eventApi.js
 */
import fetchGraphQL from '../helpers/fetchGraphQL';
import logger from '../helpers/logger';
import {
  eventQuery,
  eventNotificationsQuery,
  eventUsersQuery
} from './eventQueries';

export function fetchEvent(eventId) {
  return fetchGraphQL({
    query: eventQuery,
    variables: {eventId}
  })
    .then(response => {
      return response;
    })
    .catch(error => {
      logger(`fetchEvent ${error.response.status}: ${error.message}`);
      throw new Error();
    });
}

export function fetchNotifications(eventId) {
  return fetchGraphQL({
    query: eventNotificationsQuery,
    variables: {eventId}
  })
    .then(response => {
      return response;
    })
    .catch(error => {
      logger(`fetchNotifications ${error.response.status}: ${error.message}`);
      throw new Error();
    });
}

export function fetchEventUsers(eventId) {
  return fetchGraphQL({
    query: eventUsersQuery,
    variables: {eventId}
  })
    .then(response => {
      return response;
    })
    .catch(error => {
      logger(`fetchEventUsers ${error.response.status}: ${error.message}`);
      throw new Error();
    });
}