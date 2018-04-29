import gql from 'graphql-tag'
import {
  eventFragment,
  eventUserEdgeFragment,
  eventNotificationFragment
} from './eventQueryFragments';

export const eventQuery = gql`
  query {
    event(id: $id) {
      ...event
    }
  }
${eventFragment}`;

export const eventDetailsQuery = gql`
  query {
    event(id: $id) {
      eventUserEdges {
        ...eventUserEdge
      }
    }
  }
${eventUserEdgeFragment}`;

export const eventNotificationsQuery = gql`
  query {
    event(id: $id) {
      notifications {
        ...eventNotification
      }
    }
  }
${eventNotificationFragment}`;