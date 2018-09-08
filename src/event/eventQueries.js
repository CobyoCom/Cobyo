/**
 * GraphQL queries for the Event page
 *
 * @module eventQueries.js
 */
import gql from 'graphql-tag';
import {
  eventFragment,
  eventUserFragment,
  notificationFragment
} from './eventQueryFragments';

export const eventQuery = gql`
  query eventQuery($eventId: String!) {
    event(eventId: $eventId) {
      ...event
    }
  }
  ${eventFragment}
`;

export const eventUsersQuery = gql`
  query eventUsersQuery($eventId: String!) {
    event(eventId: $eventId) {
      eventUsers {
        ...eventUser
      }
    }
  }
  ${eventUserFragment}
`;

export const notificationsQuery = gql`
  query notificationsQuery($eventId: String!) {
    event(eventId: $eventId) {
      eventId
      notifications {
        ...notification
      }
    }
  }
  ${notificationFragment}
`;
