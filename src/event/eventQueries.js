/**
 * GraphQL queries for the Event page
 *
 * @module eventQueries.js
 */
import gql from 'graphql-tag'
import {
  eventFragment,
  eventUserFragment,
  notificationFragment
} from './eventQueryFragments';

export const eventQuery = gql`
  query eventQuery($eventId: Int!) {
    event(id: $eventId) {
      ...event
    }
  }
${eventFragment}`;

export const eventUsersQuery = gql`
  query eventUsersQuery($eventId: Int!) {
    event(id: $eventId) {
      eventUsers {
        ...eventUser
      }
    }
  }
${eventUserFragment}`;

export const eventNotificationsQuery = gql`
  query eventNotificationsQuery($eventId: Int!) {
    event(id: $eventId) {
      notifications {
        ...notification
      }
    }
  }
${notificationFragment}`;
