import gql from 'graphql-tag'
import {
  eventFragment,
  eventUserEdgeFragment,
  eventNotificationFragment
} from './eventQueryFragments';

export const eventQuery = gql`
  {
    event(id: $id) {
      ...event
    }
  }
${eventFragment}`;

export const eventDetailsQuery = gql`
  {
    event(id: $id) {
      eventUserEdges {
        ...eventUserEdge
      }
    }
  }
${eventUserEdgeFragment}`;

export const eventNotificationsQuery = gql`
  {
    event(id: $id) {
      notifications {
        ...eventNotification
      }
    }
  }
${eventNotificationFragment}`;